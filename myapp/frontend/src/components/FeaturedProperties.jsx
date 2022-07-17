import React from 'react'
import "./FeaturedProperties.css";
import useFetch from '../hooks/useFetch';


function FeaturedProperties() {
  const  {data,loading,error} = useFetch("/hotels?featured=true");


  return (
    <div className='fp'>
      {loading ? ("loading"):  data.map((item)=>(<div key={item._id}><div className='fpItem' >
      <img src={item.photos[0]} alt="" className='fpImg' />
      <span className='fpName'>{item.name}</span>
      <span className='fpCity'>{item.city}</span>
      <span className='fpPrice'>Starting from ${item.cheapestPrice}</span>
      {item.rating && <div className='fpRating'><button>{item.rating}</button><span>Excellent</span></div>}
      </div></div>))}

    </div>
    
  )
}

export default FeaturedProperties