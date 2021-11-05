import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/schemas/users.schemas';
import { UserType } from 'src/users/type/users.type';
import { AuthGuard } from '../guard/auth.guard';
import { LoginInput } from '../input/login.input';
import { SignupInput } from '../input/signup.input';
import { AuthService } from '../service/auth.service';
import { LoginType } from '../type/login.type';
import { SignupType } from '../type/signup.type';

@Resolver(of => SignupType)
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(returns => SignupType)
    async signup(@Args('signupInput') signupInput: SignupInput): Promise<User>{
        return await this.authService.signup(signupInput);
    }

    @Mutation(returns => LoginType)
    async login(@Args('loginInput') loginInput: LoginInput): Promise<User>{
        return await this.authService.login(loginInput);
    }

    @Query(returns => UserType)
    @UseGuards(new AuthGuard())
    me(@Context('user') user: User) {
        return user;
    }
}
