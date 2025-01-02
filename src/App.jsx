import React from "react"
import Navbar from "./componenets/Navbar/Navbar"
import {Routes,Route} from 'react-router-dom'
import Home from "./pagee/home/coin/Home"
import Coin from "./pagee/home/coin/Coin"
import Footer from "./componenets/Footer/Footer"

function App() {
  return (
    <div className="app">
    <Navbar/>
    <Routes>
   <Route path="/" element={<Home/>}/>
    <Route path="/coin/:coinId" element={<Coin/>}/>
    </Routes>
    <Footer/>
    </div>
  )
}

export default App
                                