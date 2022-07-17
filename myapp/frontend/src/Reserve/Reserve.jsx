import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import "./Reserve.css"
import useFetch from '../hooks/useFetch';
import { useState } from 'react';
import { SearchContext } from '../context/searchContext';
import { DateRange } from 'react-date-range';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';




const Reserve = ({setOpen,hotelId}) => {

      const [selectedRooms, setSelectedRooms] = useState([])
      const  {data,loading,error} = useFetch(`/hotels/room/${hotelId}`);
      const {dates}=useContext(SearchContext);

      const getDatesInRange=(startDate,endDate)=>{
            const start = new Date(startDate);
            const end = new Date(endDate);
            const date = new Date(start.getTime());
            
            let dates=[];
            
            while(date <= end){
              dates.push(new Date(date).getTime());
              date.setDate(date.getDate()+1)
            }
            
            return dates;
      }
    

      const alldates=getDatesInRange(dates[0].startDate,dates[0].endDate);

      const isAvailable = (roomNumber)=>{
            const isFound = roomNumber.unavailableDates.some((date)=>
            (alldates.includes(new Date(date).getTime())))
            return !isFound
      }


      const handleSelect=(e)=>{
      const checked = e.target.checked;
      const value=e.target.value;
      setSelectedRooms(checked ? [...selectedRooms,value]: selectedRooms.filter((item)=>item !==value))
     } 

      const navigate=useNavigate();

      const handleClick=async()=>{
        try{
            await Promise.all(selectedRooms.map(roomId=>{
            const res= axios.put(`/rooms/availability/${roomId}`,{dates: alldates});
            return res.data;
          }))
          setOpen(false)
          navigate("/");

        }catch(err){

        }
      }

      console.log(data)
      console.log(alldates)
  return (
    <div className='reserve'>
         <div className="rContainer">
       
            <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=>setOpen(false)} />
            <span>Select your rooms: </span>
                 {data.map((item)=>(
                 <div className='rItem'>
                     <div className="rItemInfo">
                         <div className="rTitle">{item.title}</div>
                         <div className="rDesc">{item.desc}</div>
                         <div className="rMax">Max People:<b>{item.maxPeople}</b> </div>
                         <div className="rPrice">${item.price} </div>
                    </div>
                        <div className="rSelectRooms">
                         {item.roomNumbers.map(roomNumber=>(
                             <div className="room" key={roomNumber.number}>
                                <label>{roomNumber.number}</label>  
                                <input type="checkbox" disabled={!isAvailable(roomNumber)} value={roomNumber._id}  onChange={handleSelect} />
                             </div>
                            
                          ))}
                        </div>
                 </div>
            ))} 

            <button onClick={handleClick} className='rButton'>Reserve Now!</button>
       </div> 
        
    </div>
  )
}

export default Reserve