import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/schemas/users.schemas";
import { UserType } from "src/users/type/users.type";

@ObjectType('Transaction')
export class TransactionType {
    @Field(() => ID)
    id: string;

    @Field()
    transaction_type: string;

    @Field()
    amount: number;

    @Field()
    transaction_date: string;

    @Field()
    ref_no: string;

    @Field()
    bank_name: string;

    @Field()
    account_no: string;

    @Field()
    status: string;

    @Field()
    recipient_account_no: string;

    @Field()
    description: string;

    @Field(type => UserType)
    user: User;
}