import React from 'react'
import "./SearchItem.css"
import {
    useNavigate,
    Link
  } from "react-router-dom";


const SearchItem = ({item}) => {


    // const navigate = useNavigate();
    // const moveToHotelsPage=()=>{
    //         navigate('/hotels/:id')
    // }

  return (
    <div className='searchItem'>
        <img className='siImg' src={item.photos[0]} alt="" />
        <div className="siDesc">
            <h1  className='siTitle'>{item.name}</h1>
            <span className='siDistance'> {item.distance}m from the center</span>
            <span className='siTaxiOp'>Free Airport Taxi</span>
            <span className='siSubtitle'>Studio Apartment with air Conditioning</span>
            <span className='siFeatures'>{item.desc}</span>
            <span className='siCancelOp'> Free Cancellation</span>
            <span className='siCancelOpSubtitle'>You can Travel later,so lock in this great price today!</span>
        </div>
        <div className="siDetails">
          {item.rating &&   <div className="siRating">
                <span className=''>Excellent</span>
                <button>{item.rating}</button>
            </div> }
            <div className="siDetailTexts">
                <span className='siPrice'> ${item.cheapestPrice}</span>
                <span className='siTaxOp'>Includes taxes and fees</span>
                <Link to={`/hotels/${item._id}`}>
                <button 
                // onClick={moveToHotelsPage}
                 className='siCheckButton'>See Availability</button> 
                </Link>
            </div> 
        </div>
    </div>
  )
}

export default SearchItem