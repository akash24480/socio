import express from 'express'
// Use the cors when connecting the frontend
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './db/db.js'
import authroutes from './routes/auth.route.js'


dotenv.config()

const app = express()
const port = process.env.PORT || 4000

// defining the cors

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))

app.use(express.json({ limit: "5mb" })); //Parse JSON request bodies
app.use(cookieParser())

app.use("/api/v1/auth", authroutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, ()=> {
    console.log(`Server is running on the port ${port}`)
    connectDB()
})