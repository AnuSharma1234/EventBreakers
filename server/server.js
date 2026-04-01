import express from 'express'
import connectDb from './db/connect.db.js'
import authRouter from './routes/auth.router.js'
import googleAuthRouter from './routes/google.router.js'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import eventRouter from './routes/event.router.js'
import registerRouter from './routes/register.router.js'
import passport from 'passport'
import cookieSession from 'cookie-session'
import './utils/passport.js'

const app = express()

configDotenv({
    path: '.env'
})

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())

app.use(cookieSession({
    name: 'session',
    keys: [process.env.TOKEN_KEY || 'secret-key'],
    maxAge: 24 * 60 * 60 * 1000
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)
app.use('/auth/google', googleAuthRouter)
app.use('/event',eventRouter)
app.use('/register',registerRouter)

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server started on PORT : ${process.env.PORT}`)
    connectDb()
})