import { BadRequestException, ConflictException, Injectable, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from '../input/users.input';
import * as bcrypt from "bcryptjs";
import { User, UserDocument } from '../schemas/users.schemas';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        try {
            let { fullName, email, phone, password, role } = createUserInput;
            let emailExists:boolean = await this.userModel.exists({ email });
            if (emailExists) {
                throw new ConflictException('Email already exists')
            }
            let phoneExists:boolean = await this.userModel.exists({ phone });
            if(phoneExists) {
                throw new ConflictException('Phone already exists');
            }

            password = await bcrypt.hash(password, 12);
            
            return await this.userModel.create({ fullName, phone, email, password, role, isActive: true, account_no: phone });
        } catch (error) {
            throw new BadRequestException(error.response);
        }
    }

    async getUser(id: string): Promise<User> {
        try {
            return await this.userModel.findOne({ _id: id }).exec();
            
        } catch (error) {
            throw new BadRequestException(error.response);
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            return await this.userModel.find().exec();
        } catch (error) {
            throw new BadRequestException(error.response);
        }
    }
}
