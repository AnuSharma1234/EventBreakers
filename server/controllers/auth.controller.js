import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import welcomeTemplate from '../mailTemplates/newJoining.js'
import mailSender from '../utils/mailSender.js'

async function sendJoiningEmail(email , name){
    try{
        const mailResponse = await mailSender(email , "Verification email from TCB",welcomeTemplate(name))
    }catch(error){
        console.log(error.message)
    }
}

export const signUp = async (req, res) => {
    try {
        const { name,  email, password } = req.body
 
        if (!email || !name) {
            const error = new Error('Email and name are required for Sign-Up')
            throw error
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            const error = new Error('User already exists with this email ,try logging in')
            res.status(200).json({
                success : false,
                message : 'User already exists with this email , try logging in'
            })
            throw error
        }

        let user
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            user = await User.create({ name, email, password: hashedPassword, isAdmin: false })
        } else {
            user = await User.create({ name, email, password: null, isAdmin: false })
        }

        const token = jwt.sign(
            user.toJSON(),
            process.env.TOKEN_KEY,
            {expiresIn : '30d'}
        )

        sendJoiningEmail(email,name)

        res.status(200).json({
            success : true,
            token,
            user
        } )

    }catch (error) {
        res.status(400).json({
            success: false,
            error: 'Sign-up Failed'
        })
        console.log(error)
    }
}


export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            const error = new Error('Both credentials are required for Sign-In')
            error.statusCode = 400
            throw error
        }

        const user = await User.findOne({ email })

        if (!user) {
            const error = new Error('User does not exists !')
            error.statusCode = 400
            throw error
        }

        if (user.isGoogleAuth) {
            const error = new Error('Please sign in with Google')
            error.statusCode = 400
            throw error
        }

        const isPassValid = await bcrypt.compare(password, user.password)

        if (!isPassValid) {
            const error = new Error('Invalid Password')
            error.statusCode = 400
            throw error
        }

        const token = jwt.sign(user.toJSON(),process.env.TOKEN_KEY, {
            expiresIn : '30d'
        })

        res.status(200).json({
            success : true,
            token,
            message : "Logged in Succesfully",
            user : {
                id : user._id , name : user.name , email : user.email , isAdmin : user.isAdmin , isRegisterdForLatesEvent : user.isRegisterdForLatestEvent
            }
        })

    }catch(error) {
        res.status(error.statusCode).json({
            success : false,
            error : {
                message : error.message || "Internal server error"
            }
       })
        console.log(error)
    }
}
