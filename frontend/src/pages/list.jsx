import { useEffect,useState } from "react"; 
import Card from "../components/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Helmet} from 'react-helmet-async';
import { setHotels,deleteHotel} from "../redux/hotel";
import {useDispatch,useSelector} from "react-redux" ;
import "../css/list.css"
import Pagination from "../components/pagination";  


function List()
{
    
    const [search,setSearch]=useState("");
    const [minprice,setMinprice]=useState("")
    const [maxprice,setMaxprice]=useState("")
    const [page,setPage]=useState(1);


    const dispatch=useDispatch();

    const limit=5;

    const hotel=useSelector(
        (state)=>state.hotels.data
    )

    useEffect(()=>{getHotel()},[]);

    //get from backend
    const getHotel=async()=>{
        try {
            const getting= await axios.get("http://localhost:5000/api/hotels");
            dispatch(setHotels(getting.data))
            
        } catch (error) {
            console.log(error); 
        }
        
    }

    //delete

    const deletee=async(id)=>{
        try {
            await axios.delete(`http://localhost:5000/api/hotels/${id}`);
            alert("successfully deleted!!");
            dispatch(deleteHotel(id));

        } catch (error) {
            console.log(error);
            
        }
        
    }

    //price and name filter
    const filter=hotel.filter((h)=>{
        const p=Number(h.price);
        return(
            h.title.toLowerCase().includes(search.toLowerCase()) && 
            (minprice==="" || p>=Number(minprice))&&
            (maxprice==="" || p<=Number(maxprice))
        
        )
    })


    //pagination
    const start=(page-1)*limit;

    const current=filter.slice(start,start+limit);

    const total=Math.ceil(filter.length/limit);

    const navigate=useNavigate();
    return(
        <div className="li-container">
            <Helmet>
                <title>Hotel List</title>
                <meta name="description" content="Chech all the hotels based on details.." />
            </Helmet>

            <div className="list-header">
            <h1>Hotel Lists</h1>
            <button className="add" onClick={()=>navigate("/add")}>Add</button><br />
            </div>

            <div className="list-layout">
            <aside className="search">

                <h3>Filters</h3>
                <label>search<input placeholder="Search by name" value={search} onChange={ (e)=>{setSearch(e.target.value); setPage(1)}} /></label>

                <label>Min Price<input  placeholder="Min Price" value={minprice} onChange={ (e)=>{setMinprice(e.target.value); setPage(1)}} /></label>
                <label>Max Price<input   placeholder="Max Price" value={maxprice} onChange={ (e)=>{setMaxprice(e.target.value); setPage(1)}} /></label>
                <button onClick={()=>{setSearch("") ;setMaxprice(""); setMinprice(""); setPage(1)}} >Clear </button>
            </aside>

            
            <div className="results">

            <div className="card-container">

            {current.length==0 && <p>No Hotels Found!</p>}
                {current.map((hotel)=>(
                    <Card key={hotel.id} hotel={hotel} deletehotel={deletee} />

                ))
            }
            </div>
            <Pagination page={page} total={total} onChange={setPage} />
            </div>
        </div>
     </div>
    )

}

export default List;
