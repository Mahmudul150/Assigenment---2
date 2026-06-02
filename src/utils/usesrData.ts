
import { pool } from "../DB"
import type { RUser } from "./type"

export const getuserById =async (userId:string) => {
    const result = await pool.query(
        `
        SELECT id,name,role FROM users WHERE id=$1
        `
        , [userId])
    return result.rows[0] as RUser & { userId: string }
    
}