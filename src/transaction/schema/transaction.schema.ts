import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from "moment";
import * as mongoose from "mongoose";
import { User } from "src/users/schemas/users.schemas";

export type TransactionDocument = Transaction & mongoose.Document;

@Schema({timestamps: true})
export class Transaction {
    @Prop({type: String, enum: ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER'], default: ''})
    transaction_type: string;

    @Prop({type: Number})
    amount: number;

    @Prop({type: String, enum: ['PENDING', 'SUCCESS', 'FAIL'], default: 'SUCCESS'})
    status: string;

    @Prop({type: String, default: `TXN-REF-${Math.floor(Math.random() * (999999999999 - 100000000000 + 1) - 100000000000)}-${Date.now()}`})
    ref_no: string;

    @Prop({type: String, default: ""})
    recipient_account_no: string;

    @Prop({type: String, default: ""})
    bank_name: string;

    @Prop({type: String})
    account_no: string;

    @Prop({type: String, default: ""})
    description: string;

    @Prop({type: String, default: moment().format('LLLL')})
    transaction_date: moment.Moment;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);