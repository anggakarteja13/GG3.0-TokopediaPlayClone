import UserServices from "../services/user";
import { Request, Response } from "express";
import { createJwtToken } from "../utils/jwt";
import { validatePassword } from "../utils/functions";
import { loginValidate, signUpValidate } from "../middleware/user";
import { responseError, responseSuccess } from "../utils/response";

export async function signUp(req: Request, res: Response) {
    const reqData = req.body;
    try {
        const validate = await signUpValidate(reqData);
        if (validate !== true)
            return responseError(res, 400, validate);
        
        const checkUser = await UserServices.getUser(reqData.email, reqData.userName);
        if (checkUser)
            return responseError(res, 403, 'User with this email or userName is exists');

        const newUser = await UserServices.addUser(reqData);

        const data = {
            token: createJwtToken(newUser.id, newUser.role),
            user: {
                id: newUser.id,
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
    const reqData = req.body;
    try {
        const validateData = await loginValidate(reqData);
        if (validateData !== true)
            return responseError(res, 400, validateData);

        const user = await UserServices.getUser(reqData.email);
        if (!user)
            return responseError(res, 401, 'Invalid Email or Password');
        
        const checkPass = await validatePassword(reqData.password, user.password);
        console.log(user.password)
        if (!checkPass)
            return responseError(res, 401, 'Invalid Email or Password');
        delete user.password;

        const token = createJwtToken(user.id, user.role);

        return responseSuccess(res, {token, user});
    } catch (error) {
        return responseError(res, 500, error);
    }
}