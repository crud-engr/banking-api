import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class LoginInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    password: string;
}