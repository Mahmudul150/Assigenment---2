import express from 'express'
import router from './moduler/auth/auth.router'
import cookieParser  from 'cookie-parser'
import { issueRouter } from './moduler/issus/issus.router'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send(' Hellow World !')
})

app.use('/api/auth',router)
app.use('/api/issus',issueRouter.router)

export default app
