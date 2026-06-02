import jwt, { type JwtPayload } from 'jsonwebtoken'
import type { RUser } from '../utils/type'
import config from '../config'

export const SignInToken = (Payload:RUser &{id:number})=>{
    const accessToken = jwt.sign(Payload , config.access_secret as string ,{
        expiresIn:'2d'
    })
    const refreshToken = jwt.sign(Payload, config.refresh_secret as string ,{
        expiresIn:'10d'
    })

    return{accessToken , refreshToken}
}

export const VerifyToken = (token:string, type:"access"|"refresh")=>{
    const secret =  (type==="access")? config.access_secret : config.refresh_secret
    const decode = jwt.verify(token , secret as string)
    return decode as JwtPayload
}


