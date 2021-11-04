import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/schemas/users.schemas";
import { UserType } from "src/users/type/users.type";

@ObjectType('Otp')
export class OtpType {
    @Field(() => ID)
    id: string;
    
    @Field()
    phone: string;

    @Field()
    otp_code: string;

    @Field()
    auth_type: string;

    @Field()
    expiry_time: string;

    @Field(type => UserType)
    user: User;
}