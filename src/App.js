import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Hotel from './components/Hotel';
import List from './components/List';
import Login from './pages/Login';
import Reserve from './Reserve/Reserve';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/hotels" element={<List/>}></Route>
      <Route path="/hotels/:id" element={<Hotel/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/reserve" element={<Reserve/>}></Route>


    </Routes>
  </BrowserRouter>
  </>
  )
}

export default App