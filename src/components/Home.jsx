import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import Featured from './Featured';
import "./Home.css";
import PropertyList from './PropertyList';
import FeaturedProperties from './FeaturedProperties';
import MailList from './MailList';
import Footer from './Footer';


function Home() {
  return (
    <div> 
        <Navbar/>
        <Header/>
        <div className="homeContainer">
          <Featured/>
          <h1 className="homeTitle">Browse by Property Type</h1>
          <PropertyList/>
          <h1 className="homeTitle">Homes guests love</h1>
          <FeaturedProperties/>
          <MailList />   
          <Footer/>   
         </div>
    </div>

  )
}

export default Home