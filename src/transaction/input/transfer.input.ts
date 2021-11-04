import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class TransferInput {
    @IsNotEmpty()
    @IsNumber()
    @Field()
    amount: number;

    @IsNotEmpty()
    @IsString()
    @Field()
    description: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    recipient_account_no: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    bank_name: string;
}