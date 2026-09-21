const Hotel=require("../models/Model");


//post to database
const createhotel=async(req,res)=>{
    try {
        const data={
            ...req.body,
            image:req.file?req.file.path.replace(/\\/g,"/"):null
            
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

//get from database

const getALL=async (req,res)=>{
    try {
        const {title,minprice,maxprice,limit=null,offset=0}=req.query;

        const hotel= await Hotel.getHotel(
            title,
            minprice,
            maxprice,
            limit,
            offset
        );
        res.status(200).json(hotel);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
        
    }
}

//get seperate detail by id 

const getOne=async (req,res)=>{
    try {
        const hotel= await Hotel.getId(req.params.id);
        console.log("id recived",req.params.id);
        res.json(hotel);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
        
    }
}

//update details

const updateOne=async (req,res)=>{
    try {
        const data={
            ...req.body,
        }
        if(req.file)
        {
            data.image=req.file.path;
        }
        const hotel=await Hotel.updateDetail(req.params.id,data);
        res.json(hotel);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
        
    }
}

//delete details

const deleteDetail=async (req,res)=>{
    try {
        const hotel=await Hotel.deleteDetail(req.params.id);
        res.json("Deleted");
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:error.message
        })
        
    }
}

module.exports={createhotel,getALL,getOne,updateOne,deleteDetail};