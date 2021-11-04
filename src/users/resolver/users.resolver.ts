import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../schemas/users.schemas';
import { CreateUserInput } from '../input/users.input';
import { UsersService } from '../service/users.service';
import { UserType } from '../type/users.type';

@Resolver(of => UserType)
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @Query(returns => UserType)
    async getUser(@Args('id') id: string): Promise<User>{
        return await this.usersService.getUser(id);
    }

    @Query(returns => [UserType])
    async getUsers(): Promise<User[]> {
        return await this.usersService.getUsers();
    }

    @Mutation(returns => UserType)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
        return await this.usersService.createUser(createUserInput);
    }
}
