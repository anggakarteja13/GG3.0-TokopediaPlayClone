import User from "../models/User";
import { CreateUser, UserDocument } from "../types/user";
import { hashingPassword } from "../utils/functions";

class UserServices {
    static async getUserById(id: string): Promise<UserDocument|any> {
        const selectQuery = [
            'id',
            'role',
            'userName'
        ];
        const user = await User.findOne({id}, selectQuery);

        if (!user)
            return user;
        return {
            id: user.id,
            role: user.role,
            email: user.email,
            userName: user.userName
        };
    }

    static async getUser(email: string, userName?: string): Promise<UserDocument|any> {
        const selectQuery = [
            'id',
            'role',
            'email',
            'userName',
            'password',
            'imgUrl'
        ];
        const query = (!email) ? {userName} : (userName) ? 
            {$or: [{email}, {userName}]} : {email}
        const user = await User.findOne(query, selectQuery);

        if(!user)
            return user;
        return {
            id: user.id,
            role: user.role,
            email: user.email,
            userName: user.userName,
            password: user.password,
            imgUrl: user.imgUrl
        };
    }

    static async addUser(data: CreateUser): Promise<UserDocument|any> {
        const hashedPass = await hashingPassword(data.password);
        const createData: CreateUser = {
            role: data.role,
            email: data.email,
            userName: data.userName,
            password: hashedPass
        }
        const user = await User.create(createData);
        return {
            id: user.id,
            userName: user.userName,
            email: user.email,
            role: user.role,
            imgUrl: user.imgUrl
        }
    }
}

export default UserServices;
