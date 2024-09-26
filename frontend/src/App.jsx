import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './pages/Hero'
import BuyerDashboard from './pages/BuyerDashboard'
import SellerDashboard from './pages/SellerDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <Router>
      <Header />
      <Routes>

      

      </Routes>
      <Footer />
    </Router>

   </div>
  )
}

export default App
