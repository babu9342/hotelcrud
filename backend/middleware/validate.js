const fs=require("fs");

const validate=(req,res,next)=>{
    const {title,description,latitude,longitude,price}=req.body;
    const error=[];

    const numcheck=(value)=>value!==undefined && String(value).trim()!=="" && !isNaN(Number(value));

    if(!title || !title.trim())
        error.push("Title is required!");
    if(!description || description.trim().length<20)
        error.push("Description minimum 20 character!");
    if(!numcheck(latitude) || Number(latitude)<-90 || Number(latitude) >90)
        error.push("Invalid latitue!")
    if(!numcheck(longitude) || Number(longitude)<-90 || Number(longitude) >90)
        error.push("Invalid latitue!")
    if(!numcheck(price) || Number(price)<=0)
        error.push("Invalid Price!")
    if(req.method==="POST" && !req.file)
        error.push("Image is required!")

    if(error.length){
        if(req.file)
             fs.unlink(req.file.path,()=>{});
             return res.status(400).json({message:error.json(",")})

    }
    next();
}

module.exports=validate;