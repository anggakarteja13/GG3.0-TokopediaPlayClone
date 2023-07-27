import { Document } from "mongoose"

export interface CreateUser {
    role: string,
    email: string,
    userName: string,
    password: string
}

export type UserDocument = CreateUser & Document & {
    id: string,
    imgUrl: string
}

export type LoginUser = Pick<UserDocument, 'email'|'password'>
