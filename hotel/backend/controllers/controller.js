const Hotel=require("../models/Model");


//post to backend
const createhotel=async(req,res)=>{
    try {
        const data={
            image:req.file?req.file.path:null,...req.body
        };

        const hotel=await Hotel.createHotel(data);
        res.status(201).json({
            message:"Hotel created successfull",
            hotel:hotel
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:error.message
        })
        
    }
}

//get from backend

const getALL=async (req,res)=>{
    try {
        const hotel= await Hotel.getHotel();
        res.json(hotel);
    } catch (error) {
        console.log(error.message);
        
    }
}

//get seperate detail by id 

const getOne=async (req,res)=>{
    try {
        const hotel= await Hotel.getId(req.params.id);
        res.json(hotel);
    } catch (error) {
        console.log(error.message);
        
    }
}

//update details

const updateOne=async (req,res)=>{
    try {
        const hotel=await Hotel.updateDetail(req.params.id,req.body);
        res.json(hotel);
    } catch (error) {
        console.log(error.message);
        
    }
}

//delete details

const deleteDetail=async (req,res)=>{
    try {
        const hotel=await Hotel.deleteDetail(req.params.id);
        res.json("Deleted");
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports={createhotel,getALL,getOne,updateOne,deleteDetail};