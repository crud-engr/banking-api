import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, MinLength, IsNotEmpty } from "class-validator"

@InputType()
export class CreateUserInput {
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

    @IsNotEmpty()
    @IsString()
    @Field()
    role: string;
}