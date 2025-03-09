import express from 'express'
import dotenv from 'dotenv'
import {PORT} from './config/env.js'
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import e from 'express';
dotenv.config();
const app = express();
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(PORT)
    console.log(`Subscription Tracker App listening on https://localhost:${PORT}`)
}).on('error', (err)=>{
    console.log('Error starting the server', err)})

export default app;
