import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOtpInput } from '../input/otp.input';
import { OtpService } from '../service/otp.service';
import { OtpType } from '../type/otp.type';
import { Otp } from '../schema/otp.schema';

@Resolver(of => OtpType)
export class OtpResolver {
    constructor(private otpService: OtpService) {}

    @Query(returns => OtpType)
    async getOtp(@Args('id') id: string): Promise<Otp>{
        return await this.otpService.getOtp(id);
    }

    @Query(returns => [OtpType])
    async getOtps(): Promise<Otp[]>{
        return await this.otpService.getOtps();
    }

    // @Mutation(returns => OtpType)
    // async createOtp(@Args('createOtpInput') createOtpInput: CreateOtpInput): Promise<Otp>{
    //     return await this.otpService.createOtp(createOtpInput);
    // }
}
