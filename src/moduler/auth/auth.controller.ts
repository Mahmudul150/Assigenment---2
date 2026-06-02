import type { Request, Response } from "express";
import authService from "./auth.service";
import { sendResponse } from "../../utils/globalErrorHandling";
import { SignInToken } from "../../Token/jwt.token";

const signup = async(req:Request,res:Response)=>{
    const result = await authService.createUser(req.body)
    if (!result) {
        return  sendResponse(res, {message:"User could not found",error:false},401)
    }

    return sendResponse(res,{message:"User SignUp Successfully",data:result,},201)
}



const login = async(req:Request,res:Response) =>{
    const {email , password} = req.body;
  
    const user = await authService.validation(email , password)

    if (!user) {
        sendResponse(res , {message:"Invalide email or password"},401)
        return
    }
    const payload = {
    id: user.id,
    name: user.name,
    email:user.email,
    role: user.role,
  } 
    const {accessToken,refreshToken} =SignInToken(payload)

    res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
  })
  res.cookie("accessToken", accessToken, {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
  })

    const result = {
        user,
        accessToken,
        
    }

   return sendResponse(res, { message: "User Login successful", data: result }, 200);
}

export  const authControler = {
    signup,
    login
}