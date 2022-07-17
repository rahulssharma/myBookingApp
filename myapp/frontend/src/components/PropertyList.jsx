import React from 'react'
import useFetch from '../hooks/useFetch';
import './PropertyList.css'

function PropertyList() {
    const  {data,loading,error} = useFetch("/hotels/countByType");
    // console.log(data)

    const Images = [
        "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

    ]

  return (
      <><div className="pList">
        {loading ? "loading" : ( <> {data &&  Images.map((image,i)=>(
        <div className='pListItems' key={i}>
        <img className='pListImg' src={image} alt="" />
        <div className="pListTitles">
            <h1>{data[i]?.type}</h1>
            <h2>{data[i]?.count} {data[i]?.type}</h2>
        </div>
            </div>
        ))} </> )}
    </div>
    </>
  )
}

export default PropertyList