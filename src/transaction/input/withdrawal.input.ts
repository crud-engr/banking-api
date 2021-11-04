import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class WithdrawalInput {
    @IsNotEmpty()
    @IsNumber()
    @Field()
    amount: number;

    @IsNotEmpty()
    @IsString()
    @Field()
    bank_name: string;
}