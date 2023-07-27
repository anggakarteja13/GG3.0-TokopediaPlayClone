import DB from "../db";
import { CreateUser } from "../types/user";
import User, { UserDocument } from "../models/User";

class UserServices {
    static async getUserById(_id: string): Promise<UserDocument|any> {
        try {
            const selectQuery = [
                '_id',
                'role',
                'userName'
            ];
            const user = await User.findOne({_id}, selectQuery);

            if (!user)
                return user;
            return {
                _id: user._id,
                role: user.role,
                email: user.email,
                userName: user.userName
            };
        } catch (error) {
            return {error};
        }
    }

    static async getUser(email: string|null, userName: string|null): Promise<UserDocument|any> {
        try {
            const selectQuery = [
                '_id',
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
                _id: user._id,
                role: user.role,
                email: user.email,
                userName: user.userName,
                password: user.password,
                imgUrl: user.imgUrl
            };
        } catch (error) {
            return {error};
        }
    }

    static async addUser(data: CreateUser): Promise<UserDocument|any> {
        const session = await DB.conn.startSession();
        try {
            session.startTransaction();
            const user = await User.create(data);
            await session.commitTransaction();
            return {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role,
                imgUrl: user.imgUrl
            };
        } catch (error) {
            await session.abortTransaction();
            return {error};
        } finally {
            await session.endSession();
        }
    }
}

export default UserServices;
