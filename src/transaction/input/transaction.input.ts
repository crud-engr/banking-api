import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateTransactionInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    transaction_type: string;

    @IsNotEmpty()
    @IsNumber()
    @Field()
    amount: number;

    @IsNotEmpty()
    @IsString()
    @Field()
    status: string;

    // @IsNotEmpty()
    @IsString()
    @Field()
    recipient_account_no: string;

    // @IsNotEmpty()
    @IsString()
    @Field()
    description: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    user: string;
}