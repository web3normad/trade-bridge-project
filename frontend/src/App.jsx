import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './pages/Hero'
import BuyerDashboard from './pages/BuyerDashboard'
import SellerDashboard from './pages/SellerDashboard'
import MarketPlace from "./pages/MarketPlace";

function App() {
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask detected");
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);
        const userSigner = await provider.getSigner(); // Await here
        setSigner(userSigner);
      } catch (error) {
        if (error.code === 4001) {
          console.error("User rejected the request.");
          alert(
            "You rejected the connection request. Please connect to use the app."
          );
        } else {
          console.error(
            "Error fetching accounts or connecting to MetaMask:",
            error
          );
        }
      }
    } else {
      console.error(
        "MetaMask not installed. Please install MetaMask to use this app."
      );
      alert("MetaMask not installed. Please install it to proceed.");
    }
  };

  useEffect(() => {
    const loadProvider = async () => {
      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask detected");
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await provider.listAccounts();
          setAccount(accounts[0]);
          const userSigner = await provider.getSigner();
          setSigner(userSigner);
        } catch (error) {
          if (error.code === 4001) {
            console.error("User rejected the request.");
            alert(
              "You rejected the connection request. Please connect to use the app."
            );
          } else {
            console.error(
              "Error fetching accounts or connecting to MetaMask:",
              error
            );
          }
        }
      } else {
        console.error(
          "MetaMask not installed. Please install MetaMask to use this app."
        );
        alert("MetaMask not installed. Please install it to proceed.");
      }
    };
    loadProvider();
  }, []);


  return (
   <div>
     <Router>
      <div className="App flex flex-col min-h-screen">
        {/* Navbar (Header) */}
        <Header setSigner={setSigner} setAccount={setAccount} />

        {/* Main content (Hero) */}
        <main className="flex-grow flex h-full items-center justify-center">
          <Routes>
            <Route
              path="/"
              element={
                <Hero
                />
              }
            />
            <Route
              path="/hero"
              element={
                <Hero
                />
              }
            />
            <Route
              path="/market-place"
              element={
                <MarketPlace
                signer={signer}/>
              }
            />
            <Route
              path="/buyer-dashboard"
              element={
                <BuyerDashboard
                signer={signer} />
              }
            />
            <Route
              path="/seller-dashboard"
              element={
                <SellerDashboard
                signer={signer}/>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>

   </div>
  )
}

export default App
