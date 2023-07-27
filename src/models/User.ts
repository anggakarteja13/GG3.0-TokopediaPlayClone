import { Schema, Document, model } from "mongoose";
import constant from "../utils/constant";

export type UserDocument = Document & {
    role: string,
    email: string,
    userName: string,
    password: string,
    imgUrl: string
}

const UserSchema = new Schema<UserDocument>(
    {
        role: {
            type: String,
            enum: [constant.merchantRole, constant.userRole],
            default: 'user'
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is needed']
        },
        userName: {
            type: String,
            required: [true, 'UserName is needed']
        },
        password: {
            type: String,
            required: [true, 'Password is needed']
        },
        imgUrl: {
            type: String,
            default: null
        }
    },
    {
        timestamps: {},
        collection: 'users'
    }
);

const User = model<UserDocument>('User', UserSchema);

export default User;
