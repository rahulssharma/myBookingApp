import { React, useState } from 'react'
import Navbar from './Navbar'
import Header from './Header'
import './list.css'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range';
import SearchItem from './SearchItem';
import useFetch from '../hooks/useFetch';



function List() {

  const location = useLocation();
  // console.log(location.state.options.adult)
  const [dates, setDates] = useState(location.state.dates)
  const [openDate, setOpenDate] = useState(false)
  const [destination, setDestination] = useState(location.state.destination);
  const [Options, setOptions] = useState(location.state.options)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)


  const  {data,loading,error,reFetch} = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max  || 999}`);
  // const  {data,loading,error,reFetch} = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max  || 999}`);

  const handleClick=()=>{
    reFetch()
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className='lsTitle'> Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={destination}  />
            </div>

            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && <DateRange onChange={item => setDates([item.selection])} minDate={new Date()} ranges={dates}></DateRange>}
            </div>
            <div className="lsItem">
               <label>Options</label>
               <div className="lsOption">
                <div className="lsOptionItem">
                  <span className='lsOptionText'> Min Price <small>per night</small></span>
                  <input type="number" onChange={e=>setMin(e.target.value)} className='lsOptionInput' />
                </div>
              </div>

              <div className="lsItem">
                <div className="lsOptionItem">
                  <span className='lsOptionText'> Max Price <small>per night</small></span>
                  <input type="number" onChange={e=>setMax(e.target.value)} className='lsOptionInput' />
                </div>
              </div>


              <div className="lsItem">
                <div className="lsOptionItem">
                  <span className='lsOptionText'> Adult</span>
                  <input type="number" min={1} className='lsOptionInput' placeholder={Options.adult} />
                </div>
              </div>


              <div className="lsItem">
                <div className="lsOptionItem">
                  <span className='lsOptionText'> Children </span>
                  <input type="number" min={0} className='lsOptionInput' placeholder={Options.children} />
                </div>
              </div>


              <div className="lsItem">
                <div className="lsOptionItem">
                  <span className='lsOptionText'> Room </span>
                  <input type="number" min={1} className='lsOptionInput' placeholder={Options.room} />
                </div>
              </div>
            </div>
               <button onClick={handleClick}>Search</button>
          </div>
        <div className="listResult">
          {loading ? "loading" : <>{
            data.map((item)=>( 
              <SearchItem item={item} key={item._id}/>
            ))}
          </>}
          </div>


        </div>
      </div>
    </div>


  )
}

export default List