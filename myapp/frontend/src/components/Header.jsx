import React, { useContext, useState } from 'react'
import "./Header.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { faBed, faPerson, faCalendarDays, faCar, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns'
import {useNavigate} from 'react-router-dom';
import { SearchContext } from '../context/searchContext';
import { AuthContext } from '../context/AuthContext';

const Header=({type})=> {
  const [destination,setDestination]=useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [openOptions, setopenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions(prev => {
      return {
        ...prev, [name]: operation === 'i' ? options[name] + 1 : options[name] - 1
      }
    })
  }


  const {dispatch}=useContext(SearchContext)

  const navigate=useNavigate()
  const handleSearch=()=>{
      dispatch({type:"NEW_SEARCH", payload:{destination,dates,options}}); 
      navigate('/hotels',{state:{ destination , dates , options }})
  }

  const {user}=useContext(AuthContext);


  return (
    <div className='header'>
      <div className={type ==='list' ? 'headerContainer listMode' : 'headerContainer'}>
        <div className="headerList">
          <div className="headerListItems active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItems">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItems">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItems">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItems">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
          </div>
        </div>
       {type!=='list' && <> <h1 className='headerTitle'> A lifetime of discounts? It's Genius.</h1>
          <p className='headerDesc'>
            Get rewarded for your travels - unlock instant saving of 10% or more with a free LamaBooking account
          </p>
           {!user && <button className='headerButton'>Sign in / Register</button>}
        <div className="headerSearch">
          <div className="headerSearchItems">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input type="text" placeholder='Where are you going?' onChange={(e)=>setDestination(e.target.value)} className='headerSearchInput'></input>
          </div>
          <div className="headerSearchItems">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, 'dd/MM/yyyy')} to  ${format(dates[0].endDate, 'dd/MM/yyyy')}`} </span>
            {openDate && <DateRange
              editableDateInputs={true}
              onChange={item => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className="date"
              minDate={new Date()}
            />}
          </div>
          <div className="headerSearchItems">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span onClick={() => setopenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult. ${options.children} children .  ${options.room} room  `}</span>
            {openOptions && <div className="options">
                           <div className="optionItems">
                           <span className='optionText'>Adult</span>
                            <div className="optionCounter">
                            <button className="optionCounterButton" disabled={options.adult <= 1} onClick={()=>handleOption("adult","d")}>-</button>
                            <span className="optionCounterNumber">{options.adult}</span>
                            <button className="optionCounterButton" onClick={()=>handleOption("adult","i")}>+</button>
                            </div>
                          </div>
                          <div className="optionItems">
                            <span className='optionText'>Children</span>
                            <div className="optionCounter">
                            <button className="optionCounterButton" disabled={options.children <= 0} onClick={()=>handleOption("children","d")}>-</button>
                            <span className="optionCounterNumber">{options.children}</span>
                            <button className="optionCounterButton" onClick={()=>handleOption("children","i")}>+</button>
                            </div>
                          </div>
                          <div className="optionItems">
                            <span className='optionText'>Room</span>
                            <div className="optionCounter">
                            <button className="optionCounterButton" disabled={options.room <= 1} onClick={()=>handleOption("room","d")}>-</button>
                            <span className="optionCounterNumber">{options.room}</span>
                            <button className="optionCounterButton" onClick={()=>handleOption("room","i")}>+</button>
                            </div>
                          </div>
                        </div>}
                     </div> 
                <div className="headerSearchItems">
                    <button className="headerBtn" onClick={handleSearch}>Search</button>
                </div>
            </div>  </>}
        </div>
      </div>
      )
}

      export default Header


