import UserServices from "../services/user";
import { Request, Response } from "express";
import { createJwtToken } from "../utils/jwt";
import { CreateUser, LoginUser } from "../types/user";
import { loginValidate, signUpValidate } from "../middleware/user";
import { responseError, responseSuccess } from "../utils/response";
import { hashingPassword, validatePassword } from "../utils/functions";

export async function signUp(req: Request, res: Response) {
    try {
        const validate = await signUpValidate(req);
        if (validate !== true)
            return responseError(res, 400, validate);

        const createData: CreateUser = {
            email: req.body.email,
            userName: req.body.userName,
            role: req.body.role,
            password: req.body.password,
            imgUrl: req.body.imgUrl
        };
        
        const checkUser = await UserServices.getUser(createData.email, createData.userName);
        if (checkUser)
            return responseError(res, 403, 'User with this email or userName is exists');
        
        createData.password = await hashingPassword(createData.password);
        const newUser = await UserServices.addUser(createData);

        const token = createJwtToken(newUser._id, newUser.role);

        const data = {
            token,
            user: {
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                role: newUser.role,
                imgUrl: newUser.imgUrl
            }
        };
        
        return responseSuccess(res, data);
    } catch (error) {
        return responseError(res, 500, error);
    }
}

export async function login(req: Request, res: Response) {
    try {
        const validateData = await loginValidate(req);
        if (validateData !== true)
            return responseError(res, 400, validateData);

        const userData: LoginUser = {
            email: req.body.email,
            password: req.body.password
        };

        const user = await UserServices.getUser(userData.email, null);
        if (!user)
            return responseError(res, 401, 'Invalid Email or Password');
        
        const checkPass = await validatePassword(userData.password, user.password);
        if (!checkPass)
            return responseError(res, 401, 'Invalid Email or Password');

        const token = createJwtToken(user.id, user.role);

        return responseSuccess(res, {token, user});
    } catch (error) {
        return responseError(res, 500, error);
    }
}