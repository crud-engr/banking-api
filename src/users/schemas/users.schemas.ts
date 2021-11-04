import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as moment from 'moment';

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
    @Prop({required: true})
    fullName: string;

    @Prop({required: true, unique: true, trim: true})
    phone: string;

    @Prop({required: true, unique: true, trim: true, lowercase: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop()
    account_no: string;

    @Prop({enum: ['admin', 'user'], default: 'user'})
    role: string;

    @Prop({default: true})
    isActive: boolean;

    @Prop({default: ""})
    access_token: string;

    @Prop({type: Number, default: 0.00})
    balance: number;

    @Prop({type: String})
    last_logged_in: string;
    
    @Prop({default: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'})
    photo: string;
    
    id: any;

}
export const UserSchema = SchemaFactory.createForClass(User);