import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('Signup')
export class SignupType {
    @Field(() => ID)
    id: string;
    
    @Field()
    fullName: string;

    @Field()
    phone: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    role: string;

    @Field()
    isActive: boolean;

    @Field()
    account_no: string;
}