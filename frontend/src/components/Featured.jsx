import React from 'react'
import "./Featured.css";
import useFetch from '../hooks/useFetch';



function Featured() {

    const  {data,loading,error} = useFetch("/hotels/countbycity?cities=berlin,madrid,london");
   
  return (
    <div className='featured'>
            {loading ? ("Loading please wait"): (<><div className="featuredItems">
                <img className='featuredImg' src="https://images.pexels.com/photos/10467844/pexels-photo-10467844.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" />
                <div className="featuredTitles">
                    <h1>Berlin</h1>
                    <h2>{data[0]} properties</h2>
                </div>
            </div>
            <div className="featuredItems">
                <img className='featuredImg' src="https://images.pexels.com/photos/10467844/pexels-photo-10467844.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" />
                <div className="featuredTitles">
                    <h1>Madrid</h1>
                    <h2>{data[1]} properties</h2>
                </div>
            </div>
            <div className="featuredItems">
                <img className='featuredImg' src="https://images.pexels.com/photos/10467844/pexels-photo-10467844.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" />
                <div className="featuredTitles">
                    <h1>London </h1>
                    <h2>{data[2]} properties</h2>
                </div>
            </div></>)}
           
    </div>
  )
}

export default Featured