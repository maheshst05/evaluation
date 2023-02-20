const express = require("express")
//const { connection } = require("mongoose")
const{connection}=require("./db")
const app = express()
app.use(express.json())
const {userRoutes}= require("./Routes/userRoutes")
const{postRoutes}= require("./Routes/postRoutes")
const{authentication}= require("./midileware/authentication")
app.get("/",(req,res)=>{
    res.send("welcome")
})


const cors=require("cors")
app.use(cors())

app.listen(9090,async(req,res)=>{
app.use("/users",userRoutes)
app.use(authentication)

app.use("/post",postRoutes)
try{
    connection
    console.log("econnect to the DB")
}catch(err){
    console.log(err)
}

    console.log("server is runing .........")
})