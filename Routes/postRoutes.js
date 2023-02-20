const express =require("express")
const postRoutes = express.Router()
const{postModel}= require("../model/postModel")

postRoutes.get("/get",async(req,res)=>{
    let query= req.query
    try{
        let post = await postModel.find({query})
        res.send(post)

    }catch(err){
        console.log({"err":err.message})
    }
})

postRoutes.post("/add",async(req,res)=>{
    let payload = req.body
    try{
let newpost = new postModel(payload)
await newpost.save()
res.send("add")
    }catch(err){
        res.send({"err":err.message})
    }
})

//delete
postRoutes.delete("/delete/:id",async(req,res)=>{
    const _id =req.params.id
    try{
let user =await postModel.findByIdAndDelete({_id})
res.send("delete")
    }catch(err){
    res.send({"error":err.message})
}
})



postRoutes.patch("/update/:id",async(req,res)=>{
    const id = req.params.id
    const payload =req.body
    try{
        const query = await postModel.findByIdAndUpdate({_id:id},payload)
   res.send({"sms":"update."})
    }catch(err){
    res.send({"error":err.message})
}

})





module.exports={
    postRoutes
}