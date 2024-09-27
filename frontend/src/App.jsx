import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './pages/Hero';
import BuyerDashboard from './pages/buyerDashboard/BuyerDashboard';
import SellerDashboard from './pages/sellerDashboard/SellerDashboard';
import Dispute from './pages/sellerDashboard/Dispute';
import CreateCommodity from "./pages/sellerDashboard/createCommodity";
import Orders from "./pages/sellerDashboard/Orders";
import MarketPlace from "./pages/MarketPlace";
import MyCommodity from "./pages/sellerDashboard/MyCommodity";
import PurchaseCommodity from "./pages/buyerDashboard/Purchase";
import DisputeSale from "./pages/buyerDashboard/Dispute";

function App() {
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask detected");
      try {
        // Create a new provider using ethers.providers.Web3Provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        
        const userSigner = provider.getSigner();
        const accounts = await provider.listAccounts();
        
        setSigner(userSigner);
        setAccount(accounts[0]);
      } catch (error) {
        if (error.code === 4001) {
          console.error("User rejected the request.");
          alert("You rejected the connection request. Please connect to use the app.");
        } else {
          console.error("Error fetching accounts or connecting to MetaMask:", error);
        }
      }
    } else {
      console.error("MetaMask not installed. Please install MetaMask to use this app.");
      alert("MetaMask not installed. Please install it to proceed.");
    }
  };

  useEffect(() => {
    connectWallet().catch(console.error);
  }, []); // Load wallet on component mount

  const location = useLocation();

  return (
    <div className="App flex flex-col min-h-screen">
      {/* Navbar (Header) - visible on all routes */}
      <Header setSigner={setSigner} setAccount={setAccount} />

      {/* Main content */}
      <main className="flex-grow w-full h-full bg-primary-100">
        <Routes>
          <Route path="/seller-dashboard" element={<SellerDashboard signer={signer} />}>
            {/* Nested routes for the Seller Dashboard */}
            <Route path="create-commodity" element={<CreateCommodity />} />
            <Route path="orders" element={<Orders />} />
            <Route path="my-commodity" element={<MyCommodity />} />
            <Route path="dispute" element={<Dispute />} />
          </Route>
          <Route path="/buyer-dashboard" element={<BuyerDashboard signer={signer} />}>
            {/* Nested routes for the Buyer Dashboard */}
            <Route path="purchase-commodity" element={<PurchaseCommodity />} />
            <Route path="dispute-sale" element={<DisputeSale />} />
          </Route>
          <Route path="/hero" element={<Hero />} />
          <Route path="/" element={<MarketPlace signer={signer} />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Wrap the App component with Router
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;

