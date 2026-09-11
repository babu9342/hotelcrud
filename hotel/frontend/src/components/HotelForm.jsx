import { useState } from "react";
import axios from "axios";

function Form() {

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
        setImage(file);
        setPreview(URL.createObjectURL(file))
    }
    const validate = () => {
        if (!image) {
            alert("Select Hotel Image")
            return false;
        }

        if (!hotel.title.trim()) {
            alert("Enter the Name")
            return false;
        }
        if (hotel.description.length > 20) {
            alert("Description minimun 20 characters")
            return false;
        }
        if (hotel.latitude < -90 || hotel.latitude > 90) {
            alert("Invalid Latitude")
            return false;
        }
        if (hotel.longitude < -180 || hotel.longitude > 180) {
            alert("Invalid Longitude")
            return false;
        }
        if (Number(hotel.price) <= 0) {
            alert("Invalid Price")
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            const data = new FormData();
            data.append("image", image)
            data.append("title", hotel.title);
            data.append("description", hotel.description);
            data.append("latitude", hotel.latitude);
            data.append("longitude", hotel.longitude);
            data.append("price", hotel.price);

            try {
                const res = await axios.post("http://localhost:5000/api/hotels", data)
                alert(res.data.message);
            }
            catch (err) {
                console.log(err);
                alert("Post Failed");

            }
        }
    }


    return (
        <div className="container">
            <h2>Add Hotel</h2>
            <form onSubmit={handleSubmit}>
                <label>Hotel Image
                    <input type="file" accept="image/*" onChange={handleImage} />
                    {preview && (<img src={preview} width="200" alt="preview" />)}
                </label><br />

                <label><input type="text" name="title" placeholder="Enter Hotel Name" value={hotel.title} onChange={handleChange} />Hotel Name: </label><br />
                <label>Description:<textarea name="description" placeholder="Enter description" value={hotel.description} onChange={handleChange} /></label><br />
                <label >Latitude:<input type="number" name="latitude" placeholder="Enter Latitude" value={hotel.latitude} onChange={handleChange} /></label><br />
                <label >Longitude:<input type="number" name="longitude" placeholder="Enter Longitude" value={hotel.longitude} onChange={handleChange} /></label><br />

                <label ><input type="number" name="price" placeholder="Enter Price" value={hotel.price} onChange={handleChange} />Price</label><br />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form;