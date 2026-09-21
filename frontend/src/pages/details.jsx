import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/details.css"
import {Helmet} from 'react-helmet-async';


function Details()
{
    const {id}=useParams();
    const [hotel,setHotel]=useState(null);
    const [location,setLocation]=useState(null);
    const navigate=useNavigate();

    //for get details
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/hotels/${id}`).then(res=>setHotel(res.data))
        .catch(err=>console.log(err)
        )
    },[id]);
    
    //for location
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setLocation({
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude
                })
            },(err)=>{
                console.log(err.message);
                
            }
        )
    },[]);




    if(!hotel)
    {
        return <p className="msg">Loading...</p>
    }

    return(
        
        <div className="detail-page">
            <Helmet>
            <title>{hotel.title} Hotel Details</title>
            <meta name="description" content={hotel.description?.slice(0,150)} />
            </Helmet>

            <div className="detail-card">

            <button className="back-btn" onClick={()=>navigate("/")}>Back to List</button> 
            <div className="detail-top">
                     <img src={`http://localhost:5000/${hotel.image}`} alt={hotel.title} width="300" />
                <div className="details-info">
                     <h1>${hotel.price}</h1>
                     <p className="detail-price">${hotel.price} Per Day</p>
                     <p className="detail-des">{hotel.description}</p>

                </div>
            </div>
             
            <section className="detail-map">
            <h3>Location</h3>
            <iframe
             title="Location" 
             src={`https://www.google.com/maps?q=${hotel.latitude},${hotel.longitude}&output=embed`} style={{border:0}} loading="lazy"></iframe>
            </section>

             {
            location && ( 
            <section className="detail-map">
            <h3>Route from your Location</h3>
            <iframe
             title="Route" 
             src={`https://www.google.com/maps?saddrq=${location.latitude},${location.longitude}&daddr=${hotel.latitude},${hotel.longitude}&output=embed`} style={{border:0}} loading="lazy"></iframe>
            </section>
             )}  
              
            
        </div>
    </div>
    )
}

export default Details;