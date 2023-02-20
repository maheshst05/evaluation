const express = require("express")
const userRoutes = express.Router()
const{userModel} = require("../model/userModel")
const bcrypt =require("bcrypt")
var jwt = require('jsonwebtoken');
//register
userRoutes.post("/register",async(req,res)=>{
    let {name,email,gender,password,age,city}= req.body;
try{

    bcrypt.hash(password, 5,async function(err, hash) {
        if(err){
            res.send({"error":err.message}) 
        }else{
            let newuser =new userModel({name,email,gender,password:hash,age,city})
            await newuser.save()
            res.send({"msg":"new user register succefuly"})
        }
    });

}catch(err){
    res.send({"error":err.message})
}

})

//login
userRoutes.post("/login",async(req,res)=>{
    try{
        const {email,password}= req.body

const user = await userModel.find({email})
if(user.length>0){
    bcrypt.compare(password, user[0].password, function(err, result) {
        if(result){
        const token = jwt.sign({ userID: user[0]._id }, 'masai');
        res.send({"msg":"Login Successfull","token":token})
        } 
        else {res.send({"msg":"Wrong creadiancial"})}
        });
}
else{
    res.send({"msg":"Wrong creadiancial"})
}

    }catch(err){
        res.send({"error":err.message})
    }
})


module.exports={
    userRoutes
}


