import dotenv from 'dotenv'

dotenv.config({quiet:true})

const config ={
    port: process.env.PORT,
    database_url : process.env.DATABASE_URL,
    access_secret:process.env.ACCESS_SECRET,
    refresh_secret:process.env.REFRESH_SECRET
}

export default config