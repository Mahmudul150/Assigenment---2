import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/globalErrorHandling";
import { VerifyToken } from "../Token/jwt.token";
import { getuserById } from "../utils/usesrData";
import type { Role } from "../utils/type";

export const auth = async (req:Request,res:Response,next:NextFunction) =>{
    const token = req.headers.authorization;
     if (!token) {
        return sendResponse(res, {message:" token is not found"},404)
     }

     const Payload = VerifyToken(token,'access')

    if (!Payload) {
            return sendResponse(res, {message:"Invalid Payload"},401)
     }

      const user = await getuserById(Payload.id)
           
        
            if (!user) {
                return sendResponse(res,{message:"User Not Found"},401)
            }
         req.user = user;
         next()   
}



export const authorizeRole=(...Roles:Role[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if (!req.user) {
            return sendResponse(res,{message:"unauthorized....!",error:true},401)
        }
        if (!Roles.includes(req.user.role)) {
            return sendResponse(res,{message:"you don't have permission",error:true},400)
        }
        next()
    }
}