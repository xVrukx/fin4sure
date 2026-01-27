import dotenv from "dotenv"
import express from "express"
import connectDB from "./config/db.js"

dotenv.config()
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 8000

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`)
        })
    } catch (error) {
        console.error(`Failed to start server`, error.message)
        process.exit(1)
    }
}

startServer()