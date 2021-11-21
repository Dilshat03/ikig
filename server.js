const express = require("express")
const mongoose = require("mongoose")
const chalk = require("chalk")
const helmet = require ("helmet")
const morgan = require ("morgan")
const cors  = require ("cors")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const path = require("path");
require ("dotenv").config()



const server = express()
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log(chalk.blue("DB is connected")))
    .catch(()=>console.log(chalk.red("DB is not connected")))

// middleware
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(morgan("common"))

server.use("/api/users", userRoute)
server.use("/api/auth", authRoute)
server.use("/api/posts", postRoute)
server.use(express.static(path.join(__dirname,"./client/build")))


server.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

const port = 8080
server.listen(process.env.PORT || port, ()=> {
    console.log(chalk.magenta(`Server is running on the port  ${port}`))
})