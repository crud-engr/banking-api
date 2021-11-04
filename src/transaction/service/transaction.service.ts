import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionInput } from '../input/transaction.input';
import { Transaction, TransactionDocument } from '../schema/transaction.schema';
import * as moment from 'moment';
import { User, UserDocument } from 'src/users/schemas/users.schemas';
import { DepositInput } from '../input/deposit.input';
import { Context } from '@nestjs/graphql';
import { WithdrawalInput } from '../input/withdrawal.input';
import { TransferInput } from '../input/transfer.input';

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
        ) {}

    async createTransaction(createTransactionInput: CreateTransactionInput): Promise<Transaction> {
        let { transaction_type, amount, status, recipient_account_no, description, user } = createTransactionInput;
        user = await this.userModel.findOne({ user }).populate('_id');
        try {
            const transaction = await this.transactionModel.create(
                {
                    transaction_type,
                    amount,
                    status,
                    recipient_account_no,
                    description,
                    user
                }
            );
            return transaction;
        } catch (error) {
            throw new InternalServerErrorException('something went wrong!');
        }
    }

    async getTransactions(): Promise<Transaction[]> {
        return await this.transactionModel.find().exec();
    }

    async findUserTransactions(@Context('user') user: User): Promise<Transaction[]> {
        // user = await this.userModel.findOne({ user }).popuate("_id").exec();
        const user_id = user.id;
        const stored_user = await this.userModel.findOne({ _id: user_id }).exec();
        return await this.transactionModel.find({ user: stored_user }).exec();
    }

    async deposit(depositInput: DepositInput, @Context('user') user: User): Promise<Transaction> {
        let { amount, bank_name } = depositInput;
        if (amount < 100) {
            throw new BadRequestException(`Sorry you can't deposit N${amount}. You can only deposit N100 and above`);
        }
        // get auth user id
        const user_id = user.id;
        const stored_user = await this.userModel.findOne({ _id: user_id }).exec();
        const deposit = await this.transactionModel.create(
            { 
                amount,
                bank_name,
                transaction_type: 'DEPOSIT',
                user: stored_user,
                account_no: stored_user.account_no
            }
        );
        // update user balance
        await this.userModel.findOneAndUpdate(
            { _id: stored_user },
            { $inc: { balance: amount }}
        ).exec();
        return deposit
    }

    async withdrawal(withdrawalInput: WithdrawalInput, @Context('user') user: User): Promise<Transaction> {
        const { amount, bank_name } = withdrawalInput;
        // get auth user
        const user_id = user.id;
        const stored_user = await this.userModel.findOne({ _id: user_id }).exec();
        if (stored_user.balance < amount) {
            throw new BadRequestException(`You have an insufficient balance for the withdrawal of N${amount}`)
        }
        if (amount < 100) {
            throw new BadRequestException(`Sorry you can't withdraw N${amount}. Minimum withdrawal is N100`);
        }
        const withdrawal = await this.transactionModel.create(
            {
                amount,
                bank_name,
                transaction_type: 'WITHDRAWAL',
                user: stored_user,
                account_no: stored_user.account_no
            }
        );
        // update user balance
        await this.userModel.findOneAndUpdate(
            { _id: stored_user },
            { $inc: { balance: -amount }}
        ).exec();
        return withdrawal;
    }

    async transfer(transfertInput: TransferInput, @Context('user') user: User): Promise<Transaction> {
        const { amount, recipient_account_no, description, bank_name } = transfertInput;
        const destination_account_exists = await this.userModel.exists({ recipient_account_no });
        if (!destination_account_exists) {
            throw new NotFoundException('account number does not exist');
        }
        const user_id = user.id;
        const stored_user = await this.userModel.findOne({ _id: user_id }).exec();
        if (stored_user.balance < amount) {
            throw new BadRequestException(`You have an insufficient balance for the transfer of N${amount}`)
        }
        if (amount < 100) {
            throw new BadRequestException(`Sorry you can't transfer N${amount}. Minimum transfer is N100`);
        }
        const transfer = await this.transactionModel.create(
            {
                amount,
                recipient_account_no,
                description,
                transaction_type: 'TRANSFER',
                bank_name,
                user: stored_user,
                account_no: recipient_account_no
            }
        )
        // update destination balance
        await this.userModel.findOneAndUpdate(
            { account_no: recipient_account_no },
            { $inc: { balance: +amount } }
        ).exec();

        // update origin balance
        await this.userModel.findOneAndUpdate(
            { _id: stored_user },
            { $inc: { balance: -amount }}
        ).exec();

        return transfer;
    }
}
