import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { CreateOtpInput } from '../input/otp.input';
import { Otp, OtpDocument } from '../schema/otp.schema';

@Injectable()
export class OtpService {
    constructor(@InjectModel(Otp.name) private otpModel: Model<OtpDocument>) {}

    async getOtps(): Promise<Otp[]>{
        try {
            return await this.otpModel.find().exec();
        } catch (error) {
            throw new BadRequestException(error.response);
        }
    }

    async getOtp(id: string): Promise<Otp>{
        try {
            return await this.otpModel.findOne({ _id: id }).exec(); 
        } catch (error) {
            throw new BadRequestException(error.response);
        }
    }
}
