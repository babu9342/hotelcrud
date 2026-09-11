const express=require("express");
const router=express.Router();
const controller=require("../controllers/controller")


router.post("/",
        controller.createhotel);

router.get("/",async (req,res)=>{
    try{
        controller.getALL
    }
    catch(err)
    {
        res.status(500).json({err:err.message})
    }
})

router.put("/:id",async (req,res)=>{
    try{
        controller.updateOne
    }
    catch(err)
    {
        res.status(500).json({err:err.message})
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        controller.deleteDetail
    }
    catch(err)
    {
        res.status(500).json({err:err.message})
    }
})

module.exports=router;