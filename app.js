import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: "*",
}))



app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50kb" }))
app.use(express.static("public"))
app.use(cookieParser())

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.status(200).end();
});



import collegeRouter from './src/routes/college.route.js'
import { headerVerify } from './src/middleware/HeaderVerify.js'


app.use('/api/v1/college', headerVerify, collegeRouter)


app.get('/sanu', (req, res) => {
    res.status(200).json({ message: 'ha bhai' });
 });
 
 
// app.use('/api/altaneo/v1/leads', headerVerify, leadsRouter)

export { app }