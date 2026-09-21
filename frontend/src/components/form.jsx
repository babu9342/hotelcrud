import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import "../css/form.css";
import { Helmet } from "react-helmet-async";

function Form() {

    const navigate=useNavigate();
    const {id}=useParams();

    const [hotel, setHotel] = useState({
        title: "",
        description: "",
        latitude: "",
        longitude: "",
        price: ""
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        setHotel({ ...hotel, [e.target.name]: e.target.value })
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file))
    }
    const validate = () => {
        if(!id)
       {
        if(!image)
        {
            alert("Select image...");
            return false;
        }
       }
        if (!hotel.title.trim()) {
            alert("Enter the Name")
            return false;
        }
        if (hotel.description.length < 20) {
            alert("Description minimun 20 characters")
            return false;
        }
        if (Number(hotel.latitude) < -90 || Number(hotel.latitude) > 90) {
            alert("Invalid Latitude")
            return false;
        }
        if(hotel.latitude===""){
            alert("Enter latitude")
            return false;
        }
        if(hotel.longitude===""){
            alert("Enter longitude");
            return false;
        }
        if (Number(hotel.longitude) <-180 || Number(hotel.longitude) > 180) {
            alert("Invalid Longitude")
            return false;
        }
        if (Number(hotel.price) <= 0) {
            alert("Invalid Price")
            return false;
        }
        return true;
    
    }


    useEffect(()=>{
        if(id){
            axios.get(`http://localhost:5000/api/hotels/${id}`).then((res)=>{
                setHotel({
                    title:res.data.title,
                    description:res.data.description,
                    latitude:res.data.latitude,
                    longitude:res.data.longitude,
                    price:res.data.price
                });
                setPreview(`http://localhost:5000/${res.data.image}`);
            }).catch((err)=>{
                console.log(err);
                
            })
        }
    },[id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            const data = new FormData();
            if(image)
                {data.append("image", image);}
            data.append("title", hotel.title);
            data.append("description", hotel.description);
            data.append("latitude", hotel.latitude);
            data.append("longitude", hotel.longitude);
            data.append("price", hotel.price);

            
                let res;
                if(id)
                {
                    try {
                        res=await axios.put(`http://localhost:5000/api/hotels/${id}`,data);
                        alert("updated successfully");
                        navigate("/");
                        
                    } catch (error) {
                        console.log("update failed")
                    }
                    

                }else{
                    try {
                        res=await axios.post("http://localhost:5000/api/hotels",data);
                        alert("Hotel added successfully!!!!");
                        navigate("/");
                    } catch (error) {
                        console.log("post failed");
                        alert("Failed, try another time!")
                    }
                }
            
            
        }
    }


    return (
        <div className="form-container">
            <Helmet>
            <title>{id?"Edit Hotel":"Add Hotel"}</title>
            <meta name="description" content={hotel.description?.slice(0,150)} />
            </Helmet>
            <form onSubmit={handleSubmit}>
                <label>Hotel Image
                    <input type="file" accept="image/*" onChange={handleImage} />
                    {preview && (<img src={preview} width="200" alt="preview" />)}
                </label><br />

                <label>Hotel Name: <input type="text" name="title" placeholder="Enter Hotel Name" value={hotel.title} onChange={handleChange} /></label><br />
                <label>Description:<textarea name="description" placeholder="Enter description" value={hotel.description} onChange={handleChange} /></label><br />
                <label >Latitude:<input type="number" name="latitude" placeholder="Enter Latitude" value={hotel.latitude} onChange={handleChange} /></label><br />
                <label >Longitude:<input type="number" name="longitude" placeholder="Enter Longitude" value={hotel.longitude} onChange={handleChange} /></label><br />

                <label >Price<input type="number" name="price" placeholder="Enter Price" value={hotel.price} onChange={handleChange} /></label><br />

                <button type="submit" >{id? "Update Hotel" : "Add Hotel"}</button>
                <button type="button" onClick={()=> navigate("/")}>Cancel</button>
            </form>
        </div>
    )
}

export default Form;