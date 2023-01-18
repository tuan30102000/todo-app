import userModel from "../Model/userModel.js"
import bcrypt from 'bcrypt'
import JWT from "jsonwebtoken"

function generateAccessToken(data, time = '10m') {
    return JWT.sign({ _id: data._id, }, process.env.ACCESS_KEY, { expiresIn: time })
}
function generateRefreshToken(data, time = '365d') {
    return JWT.sign({ _id: data._id, }, process.env.REFRESH_KEY, { expiresIn: time })
}
class authController {
    async register(req, res, next) {
        const { password } = req.body
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            const newUser = new userModel({ ...req.body, password: hashed })
            await newUser.save()
            next()
        } catch (error) {
            console.log(error)
            res.status(403).json(error)
        }
    }
    async login() {
        const { username, password } = req.body
        if (!username) return res.status(403).json({ message: 'not have username' })
        if (!password) return res.status(403).json({ message: 'not have password' })
        try {
            const userData = await user.findOne({ username })
            //
            if (!userData) return res.status(403).json({ message: 'user not Exist' })
            //
            const isCorrectPassword = await bcrypt.compare(password, userData.password)
            if (!isCorrectPassword) return res.status(403).json({ message: 'wrong password' })
            const accessToken = generateAccessToken(userData)
            const refreshToken = generateRefreshToken(userData)
            return res.status(200).cookie('refreshToken', refreshToken, { httpOnly: true }).json({ data: userData, accessToken, })
        } catch (error) {
            res.status(403).json(error)
        }
    }

}

export default new authController()