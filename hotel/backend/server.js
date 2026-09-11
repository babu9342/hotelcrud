const express=require("express");
require("dotenv").config();
const app=express()
const cors=require("cors");


//midddleware
app.use(cors())
app.use(express.json)
app.use("/uploads",express.static("uploads"));

const routes=require("./routes/Routes")

app.use("/hotel",routes)
app.get("/",(req,res)=>{
    res.send("API is running");
})

const PORT=process.env.PORT;

app.listen(5000,()=>{
    console.log(`Server is Running on http://localhost:5000`);
    
})


