import { v4 as uuidv4 } from "uuid";
import { Schema, model } from "mongoose";
import constant from "../utils/constant";
import { UserDocument } from "../types/user";

const UserSchema = new Schema<UserDocument>(
    {
        id: {
            type: String,
            required: true,
            default: uuidv4,
            index: true
        },
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
