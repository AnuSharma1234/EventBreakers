import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

const googleAuthRouter = Router()

googleAuthRouter.get('/', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

googleAuthRouter.get('/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
        try {
            const token = jwt.sign(
                req.user.toJSON(),
                process.env.TOKEN_KEY,
                { expiresIn: '30d' }
            )
            
            const userData = {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                isAdmin: req.user.isAdmin,
                isRegisterdForLatestEvent: req.user.isRegisterdForLatestEvent
            }
            
            res.redirect(`http://localhost:5173/auth/google/success?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`)
        } catch (error) {
            console.error('Google callback error:', error)
            res.redirect('http://localhost:5173/login?error=google_auth_failed')
        }
    }
)

googleAuthRouter.get('/success', async (req, res) => {
    const { token, user } = req.query
    
    if (token && user) {
        res.redirect(`/?token=${token}&user=${encodeURIComponent(user)}`)
    } else {
        res.redirect('/login')
    }
})

export default googleAuthRouter