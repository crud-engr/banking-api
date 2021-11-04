import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOtpInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    otp_code: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    auth_type: string;

    @IsNotEmpty()
    @Field()
    expiry_time: string;
}