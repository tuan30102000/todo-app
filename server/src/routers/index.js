import authRouter from "./authRoute.js";

export default function (app) {
    console.log('run routers')
    app.use('/v1/auth', authRouter)
}

