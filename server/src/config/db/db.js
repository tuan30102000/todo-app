import mongoose from "mongoose";
const db = {
    async connect() {
        mongoose.set('strictQuery', false)
        try {
            await mongoose.connect(process.env.MONGODB_URL)
            console.log('connect Db mongo successfully')
        } catch (error) {
            console.log(error)
        }
    }
}

export default db