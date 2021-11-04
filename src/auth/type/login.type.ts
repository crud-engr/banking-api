import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('Login')
export class LoginType {
    @Field(() => ID)
    id: string;
    
    @Field()
    phone: string;

    @Field()
    email: string;

    @Field()
    isActive: boolean;

    @Field()
    access_token: string;
}