import userModel from "../Model/userModel.js"
import bcrypt from 'bcrypt'
class authController {
    async login(req, res,) {
        const { username,password } = req.body
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            const newUser = new userModel({ ...req.body, password: hashed })
            await newUser.save()
            res.status(200).json({ data: newUser })
        } catch (error) {
            console.log(error)
            res.status(403).json(error)
        }
    }


}

export default new authController()