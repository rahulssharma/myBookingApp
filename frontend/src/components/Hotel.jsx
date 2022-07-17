import './Hotel.css'
import Header from './Header'
import Navbar from './Navbar'
import MailList from './MailList'
import Footer from './Footer'
import React, { useContext, useState } from 'react';
import useFetch from '../hooks/useFetch';


import { faCircleXmark,faCircleArrowLeft, faCircleArrowRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../context/searchContext'
import { AuthContext } from '../context/AuthContext'
import Reserve from '../Reserve/Reserve'

const Hotel = () => {
  const location = useLocation();
  const id= location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)


  const  {data,loading,error} = useFetch(`/hotels/find/${id}`);
  const {dates,options}=useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1,date2){
    const timeDiff=Math.abs(date2.getTime()-date1.getTime());
    const dayDiff=Math.ceil(timeDiff/MILLISECONDS_PER_DAY);
    return dayDiff;
  }

  const days=dayDifference(dates[0].endDate,dates[0].startDate);
  const handleOpen=(i)=>{
    setSlideNumber(i)
    setOpen(true)
  }

  const changeSlide=(direction)=>{
    
    let newSlideNumber ;
    if(direction ==='l'){
      newSlideNumber=slideNumber=== 0  ?  5 : slideNumber - 1
    }
    else{
      newSlideNumber=slideNumber=== 5 ? 0 : slideNumber + 1
    }

    setSlideNumber(newSlideNumber)
  }
  
  const {user} = useContext(AuthContext);
  const navigate= useNavigate();
  const handleClick=()=>{
    // console.log(user)
    if(user){
      setOpenModal(true);
    }else{
      navigate("/login");
    }
  }

  return (
    <div>
      <Navbar />
      <Header type='list' />

      {/*  ========================== SLIDER  OPEN =====================================================*/}
    {loading ? "loading" : (  <div className="hotelContainer">
       { open && <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=> setOpen(false)}/>
            <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>changeSlide('l')}/>
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className="arrow"  onClick={()=>changeSlide('r')}/>
        </div>}

      {/*  ========================== SLIDER  CLOSE =====================================================*/}


        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddresss">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className='hotelDistance'>Excellent Location - {data.distance}m from the center</span>

          <span className='hotelPriceHighLight'>Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi</span>
          <div className="hotelImages">
          {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img onClick={()=>handleOpen(i)} alt="" src={photo}  className="hotelImg"  />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailTexts">
              <h1 className="hotelTitle">Best Hotel in the city </h1>
              <p className='hotelDesc'>
              {data.desc}
              </p>
            </div>
            <div className="hotelDetailPrice">
            <h1>Perfect for a night stay!</h1>
            <span>
              Located in the rela heart of Krakow, this property ha an excellent location  score of 9.8!
            </span>
            <h2>
              <b>${days * data.cheapestPrice * options.room}</b>{`   (${days} night)`}
            </h2>
            <button onClick={handleClick} >Reserve or Book Now!</button>

            </div>
          </div>
        </div>
      </div>)}
        <MailList/>
        <Footer/>
          {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  )
}

export default Hotel