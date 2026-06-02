import { pool } from "../../DB";
import type { RUser, User } from "../../utils/type";
import bcrypt from 'bcrypt'

class AuthServices{
    async createUser(user:RUser & {password:string}){
        const {name,email,password,role} = user;
        const hashPassword =await bcrypt.hash(password,10)
        const result = await pool.query(`
            INSERT INTO users(name,email,password,role) VALUES($1, $2,$3, COALESCE($4,'contributor'))
            RETURNING *
            `,[name,email,hashPassword,role])
        delete result.rows[0].password;    
        return result.rows[0];
    }


    async validation(email:string, passwordVer:string){
        const result = await pool.query(`
             SELECT * FROM users WHERE email = $1
            `,[email]);

          if (result.rows.length === 0) {
            return null
        } 
        
        const {password, ...user} = result.rows[0] as User;
         const isValied = await bcrypt.compare(passwordVer , password);
        return isValied? user : null
    }

}



export default new AuthServices;