import {useNavigate} from "react-router-dom";
import "../css/card.css";

    function Card({hotel,deletehotel})
    {
        const navigate=useNavigate();
        return(
            <div className="card" onClick={()=>navigate(`/hotels/${hotel.id}`)}>
                <div className="card-img">
                    <img src={`http://localhost:5000/${hotel.image}`} alt={hotel.title} />
                </div>

                <div className="card-body">
                    <div className="details">
                    <h3>{hotel.title}</h3>

                <p>{hotel.description?.length>50 ?hotel.description.slice(0,50)+"...":hotel.description}</p>
                <h4>${hotel.price} Per Day</h4>
                </div>
                
                
                <div className="buttons">
                    <button className="btn-edit" onClick={(e)=>{
                    e.stopPropagation();
                    navigate(`/edit/${hotel.id}`)}}>Edit</button>
                <button className="btn-delete" onClick={(e) => {
                    e.stopPropagation();
                    deletehotel(hotel.id)}}>Delete</button>
                </div>
            </div>  
        </div>
        )
    }

    export default Card;