import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

@InputType()
export class SignupInput {
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    @Field()
    fullName: string;

    @IsNotEmpty()
    @IsEmail()
    @Field()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    password: string;
}