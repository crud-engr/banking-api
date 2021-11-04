import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { User } from 'src/users/schemas/users.schemas';
import { DepositInput } from '../input/deposit.input';
import { CreateTransactionInput } from '../input/transaction.input';
import { TransferInput } from '../input/transfer.input';
import { WithdrawalInput } from '../input/withdrawal.input';
import { Transaction } from '../schema/transaction.schema';
import { TransactionService } from '../service/transaction.service';
import { TransactionType } from '../type/transaction.type';

@Resolver(of => TransactionType)
export class TransactionResolver {
    constructor(private transactionService: TransactionService) {}

    @Mutation(returns => TransactionType)
    async createTransaction(
        @Args('createTransactionInput') createTransactionInput: CreateTransactionInput): Promise<Transaction> {
        return this.transactionService.createTransaction(createTransactionInput);
    }

    @Query(returns => [TransactionType])
    async getTransactions(): Promise<Transaction[]> {
        return await this.transactionService.getTransactions();
    }

    @Query(returns => [TransactionType])
    @UseGuards(new AuthGuard())
    async findUserTransactions(@Context('user') user: User): Promise<Transaction[]> {
        return await this.transactionService.findUserTransactions(user);
    }

    @Mutation(returns => TransactionType)
    @UseGuards(new AuthGuard())
    async deposit(@Args('depositInput') depositInput: DepositInput, @Context('user') user: User): Promise<Transaction> {
        return await this.transactionService.deposit(depositInput, user);
    }

    @Mutation(returns => TransactionType)
    @UseGuards(new AuthGuard())
    async withdrawal(@Args('withdrawalInput') withdrawalInput: WithdrawalInput, @Context('user') user: User): Promise<Transaction> {
        return await this.transactionService.withdrawal(withdrawalInput, user);
    }

    @Mutation(returns => TransactionType)
    @UseGuards(new AuthGuard())
    async transfer(@Args('transferInput') transferInput: TransferInput, @Context('user') user: User): Promise<Transaction> {
        return await this.transactionService.transfer(transferInput, user);
    }
}
