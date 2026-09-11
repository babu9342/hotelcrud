const pool=require("../config/db")

//creating all details in database
const createHotel=async(hotel)=>{
    
    try {
        const result=await pool.query(`INSERT INTO hotels VALUES(image,title,description,latitude,longitude,price)
        ($1,$2,$3,$4,$5,$6) RETURNING *`,[
        hotel.image,
        hotel.title,
        hotel.description,
        hotel.latitude,
        hotel.logitude,
        hotel.price
    ]);
    return result;
    } catch (error) {
        console.log(error.message);
        console.log("Failed to insert data..!");
    }
}


//getting all details
const getHotel=async(req,res)=>{
    try {
        const result= await pool.query(
        "SELECT * FROM hotel"
    );
    return result
    } catch (error) {
        console.log(error.message);
        console.log("failed to fetch all details..!");
        
    }
};

//getting details by id or separate value
const getId=async(req,res)=>
{
    try {
        const result=await pool.query("SELECT * FROM hotels WHERE id=$1",[id]);
        return result;
    } catch (error) {
        console.log(error.message);
        console.log("failed to get by id...!");
        
    }
};


//update any of details
const updateDetail=async(id,hotel)=>{
    try {
        const result=await pool.query(`UPDATE hotels
         SET image=$1,
         title=$2,
         description=$3,
         latitude=$4,
         longitude=$5,
         price=$6

         WHERE id=$7

         RETURNING *
        `,
    [
        hotel.image,
        hotel.title,
        hotel.description,
        hotel.latitude,
        hotel.longitude,
        hotel.price,
        id
    ]);

    return result;
    } catch (error) {
        console.log(error.message);
        console.log("failed to update...!");
        
    }
};

//delete the details

const deleteDetail=async(id)=>{
    try {
        const result=await pool.query("DELETE FROM hotels WHERE id=$1",
        [id]
    );
    return result;
    } catch (error) {
        console.log(error.message);
        console.log("failed to delete..");
        
    }
}


module.exports={createHotel,getHotel,getId,updateDetail,deleteDetail};