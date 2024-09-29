import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../../components/Images";
import blockies from "blockies";
import Logo from "../../assets/images/trade_bridge.png";
import { ethers } from "ethers";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const MarketPlace = () => {
  const navigate = useNavigate();
  const agriculturalCommodities = images.agricultural;
  const solidMineralCommodities = images.solidMinerals;

  const [selectedCommodity, setSelectedCommodity] = useState(null);
  const [walletAddress, setWalletAddress] = useState(""); // State for wallet address

  // Handle card click to open the modal with selected commodity details
  const handleCardClick = (commodity) => {
    setSelectedCommodity(commodity);
  };

  // Handle navigation to the purchase page
  const handlePurchaseClick = () => {
    navigate("/buyer-dashboard/purchase-commodity", {
      state: { commodity: selectedCommodity },
    });
  };

  // Connect Wallet Function
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); 
        const signer = provider.getSigner();
        const address = await signer.getAddress(); 
        setWalletAddress(address); 
      } else {
        alert("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 py-8 px-16">
      {/* Top Navigation Bar */}
      <div className="flex justify-between border border-white py-3 px-5 rounded-full items-center mb-4">
        <div className="flex gap-2">
          <Link to="/" >
            <img src={Logo} alt="Trade Bridge Logo" className="w-10 md:w-[32px]" />
            <h1 className="text-xl font-bold text-white">
              Trade<span className="text-[#FF531E]">Bridge</span>
            </h1>
          </Link>
        </div>
        <button className="px-4 py-2 bg-[#FF531E] rounded-full" onClick={connectWallet}>
          {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
        </button>
      </div>

      {/* Search Filter Section */}
      <div className="flex justify-between border border-white rounded-full py-3 px-5 items-center mb-8">
        <div className="flex space-x-4">
          <button className="text-sm px-4 py-2 bg-gray-700 rounded-md">Categories</button>
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md"
          />
          <button className="px-8 py-2 bg-[#FF531E] rounded-full">Search</button>
        </div>
        <button className="px-8 py-2 bg-gray-800 rounded-full border border-[#FF531E]">Filters</button>
      </div>

      {/* Top Rated Section */}
      <div className="flex">
        {/* Top Rated Slider */}
        <div className="w-3/4 bg-gray-800 p-6 rounded-lg mr-8">
          <h2 className="text-2xl font-bold mb-4">Top Rated</h2>
          {/* Slider Container */}
          <Swiper spaceBetween={30} slidesPerView={1}>
            {agriculturalCommodities.slice(0, 5).map((commodity, index) => (
              <SwiperSlide key={index}>
                <div
                  className="border border-gray-700 rounded-lg shadow-md cursor-pointer bg-gray-900 text-white p-4"
                  onClick={() => handleCardClick(commodity)}
                >
                  <img
                    src={commodity.image}
                    alt={commodity.name}
                    className="h-32 w-full object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-bold truncate">{commodity.name}</h3>
                  <p className="text-sm mt-2">Price per Kilogram: {commodity.price}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Top Vendors Section */}
        <div className="w-1/4 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Top Vendors</h2>
          <div className="space-y-4">
            {solidMineralCommodities.slice(0, 3).map((commodity, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-700 border border-full rounded-full">
                <img
                  src={blockies({
                    seed: commodity.sellerAddress, 
                    size: 16,
                    scale: 3, 
                  }).toDataURL()} 
                  alt={commodity.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div className="ml-4">
                  <p className="text-lg font-bold">{commodity.sellerAddress}</p>
                  <p className="text-sm text-gray-400">Sold: 30k</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Trending Commodities</h2>
        <div className="grid grid-cols-4 gap-8">
          {agriculturalCommodities.slice(0, 4).map((commodity, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg shadow-md cursor-pointer bg-gray-700"
              onClick={() => handleCardClick(commodity)}
            >
              <img
                src={commodity.image}
                alt={commodity.name}
                className="h-32 w-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{commodity.name}</h3>
                <p className="text-sm">Price per Kilogram: {commodity.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agricultural & Solid Mineral Commodities Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Agricultural & Solid Mineral Commodities</h2>
        <div className="grid grid-cols-2 gap-8">
          {/* Agricultural Commodities */}
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-bold mb-4">Agricultural Commodities</h3>
            <div className="grid grid-cols-2 gap-4">
              {agriculturalCommodities.slice(0, 4).map((commodity, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded-lg shadow-md cursor-pointer bg-gray-900 text-white p-4"
                  onClick={() => handleCardClick(commodity)}
                >
                  <div className="relative">
                    <img
                      src={commodity.image}
                      alt={commodity.name}
                      className="h-40 w-full object-cover rounded-lg"
                    />
                    <span className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 text-xs rounded">Sold: {commodity.sold}</span>
                    <div className="absolute bottom-2 left-2 text-sm">
                      <span className="text-yellow-500">★ ★ ★ ★ ★</span>
                      <span className="ml-1">Rating</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-lg font-bold truncate">{commodity.name}</h3>
                    <p className="text-sm mt-2">Price per Kilogram: {commodity.price}</p>
                    <p className="text-xs text-gray-400 mt-2">Commodity value: <span className="text-white font-bold">{commodity.value} ETH</span></p>
                    <div className="mt-4 flex justify-between items-center">
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-full">Purchase</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solid Mineral Commodities */}
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-bold mb-4">Solid Mineral Commodities</h3>
            <div className="grid grid-cols-2 gap-4">
              {solidMineralCommodities.slice(0, 4).map((commodity, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded-lg shadow-md cursor-pointer bg-gray-900 text-white p-4"
                  onClick={() => handleCardClick(commodity)}
                >
                  <div className="relative">
                    <img
                      src={commodity.image}
                      alt={commodity.name}
                      className="h-40 w-full object-cover rounded-lg"
                    />
                    <span className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 text-xs rounded">Sold: {commodity.sold}</span>
                    <div className="absolute bottom-2 left-2 text-sm">
                      <span className="text-yellow-500">★ ★ ★ ★ ★</span>
                      <span className="ml-1">Rating</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-lg font-bold truncate">{commodity.name}</h3>
                    <p className="text-sm mt-2">Price per Kilogram: {commodity.price}</p>
                    <p className="text-xs text-gray-400 mt-2">Commodity value: <span className="text-white font-bold">{commodity.value} ETH</span></p>
                    <div className="mt-4 flex justify-between items-center">
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-full">Purchase</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
