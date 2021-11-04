import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('User')
export class UserType {
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
    photo: string;

    @Field()
    balance: number;

    @Field()
    account_no: string;

    @Field()
    isActive: boolean;
}