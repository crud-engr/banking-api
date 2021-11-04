import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date } from "mongoose";
import * as mongoose from "mongoose";
import * as moment from "moment"
import { User } from "src/users/schemas/users.schemas";

export type OtpDocument = Otp & Document; 

@Schema({timestamps: true})
export class Otp {
    @Prop()
    phone: string;

    @Prop()
    otp_code: string;

    @Prop({required: true, enum: ['verified', 'reset', 'login', 'signup', 'withdrawal', 'deposit'], default: ''})
    auth_type: string;

    @Prop({type: Date})
    expiry_time: moment.Moment;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);