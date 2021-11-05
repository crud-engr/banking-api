import { ConflictException, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from "moment";
import { User, UserDocument } from '../../users/schemas/users.schemas';
import * as bcrypt from "bcryptjs";
import { SignupInput } from '../input/signup.input';
import { LoginInput } from '../input/login.input';
import { Otp, OtpDocument } from '../../otp/schema/otp.schema';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
        private jwtService: JwtService,
    ) {}

    async signup(signupInput:SignupInput): Promise<User>{
        let { fullName, email, phone, password } = signupInput;
        const emailExist:boolean = await this.userModel.exists({ email });
        if(emailExist) {
            throw new ConflictException('email already exists');
        }
        const phoneExists:boolean = await this.userModel.exists({ phone });
        if (phoneExists) {
            throw new ConflictException('phone already exists');
        }
        password = await bcrypt.hash(password, 12);
        const user = await this.userModel.create({ fullName, email, phone, password, account_no: phone });
        await this.otpModel.findOneAndUpdate(
            {phone},
            {
                phone, otp_code: "0000",
                auth_type: "signup",
                expiry_time: moment().add(2, 'minutes'),
                user:  user._id
            },
            {new: true, upsert: true, setDefaultsOnInsert: true}
        ).exec();
        return user;
    }

    async login(loginInput:LoginInput): Promise<User>{
        const { phone, password } = loginInput;
        let user = await this.userModel.findOne({ phone }).exec();
        if (!user) {
            throw new NotFoundException('Invalid credentials');
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload: JwtPayload = { id: user._id, fullName: user.fullName, phone, email: user.email };
        const accessToken = this.jwtService.sign(payload);
        user.access_token = accessToken;
        await user.save();

        await this.userModel.findOneAndUpdate({phone: user.phone},{phone: user.phone, last_logged_in: moment().format('LLLL')}).exec();
        await this.otpModel.findOneAndUpdate({phone}, {auth_type: "login"}).exec();
        return user;
    }
}
