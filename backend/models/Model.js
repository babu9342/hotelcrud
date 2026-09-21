const pool=require("../config/db")

//creating all details in database
const createHotel=async(hotel)=>{
    
    try {
        const result=await pool.query(`INSERT INTO hotels (image,title,description,latitude,longitude,price) VALUES
        ($1,$2,$3,$4,$5,$6) RETURNING *`,[
        hotel.image,
        hotel.title,
        hotel.description,
        hotel.latitude,
        hotel.longitude,
        hotel.price
    ]);
    return result.rows[0];
    } catch (error) {
        console.log(error.message);
        console.log("Failed to insert data..!");
    }
}


//getting all details
const getHotel=async(title,minprice,maxprice,limit,offset)=>{
    
        let query=` SELECT * FROM hotels WHERE 1=1`;
        let values=[];
        let index=1;

        if(title)
        {
            query+=` AND title ILIKE $${index}`;
            values.push(`%${title}%`)
            index++;
        }
        if(minprice)
        {
            query+=` AND price >= $${index}`;
            values.push(minprice);
            index++;
        }
        if(maxprice)
        {
            query+=` AND price <= $${index}`;
            values.push(maxprice);
            index++;
        }
        query+=` ORDER BY id DESC LIMIT $${index} OFFSET $${index+1}`;
        values.push(limit);
        values.push(offset);

        const result=await pool.query(query,values);

        return result.rows;
};

//getting details by id or separate value
const getId=async (id)=>
{
    try {
        const result=await pool.query("SELECT * FROM hotels WHERE id=$1",[id]);
        return result.rows[0];
    } catch (error) {
        console.log(error.message);
        console.log("failed to get by id...!");
        
    }
};


//update any of details
const updateDetail=async(id,hotel)=>{
    try {
        const result=await pool.query(`UPDATE hotels
         SET image=coalesce ($1,image),
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

    return result.rows[0];
    } catch (error) {
        console.log(error.message);
        console.log("failed to update...!");
        
    }
};

//delete the details

const deleteDetail=async(id)=>{
    try {
        const result=await pool.query("DELETE FROM hotels WHERE id=$1 RETURNING image",
        [id],);
    return result.rows[0];
    } catch (error) {
        console.log(error.message);
        console.log("failed to delete..");
        
    }
}


module.exports={createHotel,getHotel,getId,updateDetail,deleteDetail};