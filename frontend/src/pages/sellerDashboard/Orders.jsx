import React, { useState } from 'react';

const Orders = () => {
  // Sample order data
  const sampleOrders = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    buyer: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`, // Truncated buyer address
    date: new Date().toLocaleDateString(), // Order date
    commodity: `Commodity ${index + 1}`,
    quantity: `${Math.floor(Math.random() * 300) + 100} kg`, // Changed to kg for quantity
    pricePerKg: 200, // Sample price per kg
    totalPrice: (Math.floor(Math.random() * 300) + 100) * 200, // Calculated total price
    status: 'pending', // Initial status
  }));

  const [orders, setOrders] = useState(sampleOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle approval of an order
  const handleApprove = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'approved' } : order
    ));
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="mt-16 mx-20">
      <h1 className="text-3xl font-bold mb-4">Orders</h1>
      
      {/* Check if there are any orders */}
      {orders.length > 0 ? (
        <>
          {/* Order cards */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-10">
            {currentItems.map(order => (
              <div key={order.id} className="border w-80 h-80 rounded-xl p-4 bg-white shadow-md relative">
                {/* Top section: Buyer's address and status */}
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-semibold">{order.buyer}</p>
                  <p 
                    className={`text-xs px-2 py-1 rounded-full font-bold ${order.status === 'approved' ? 'bg-green-400 text-white' : 'bg-amber-400 text-white'}`}
                  >
                    {order.status === 'approved' ? 'Success' : 'Pending'}
                  </p>
                </div>

                {/* Date row */}
                <div className="mb-2 flex">
                  <p className="font-bold mr-2">Date:</p>
                  <p>{order.date}</p>
                </div>

                {/* Line separator */}
                <hr className="border-t border-gray-300 my-2" />

                {/* Commodity information */}
                <div className="mb-2 space-y-3">
                  <div className="flex justify-between">
                    <p className="font-bold mr-2">Commodity:</p>
                    <p>{order.commodity}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold mr-2">Quantity Purchased:</p>
                    <p>{order.quantity}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold mr-2">Price per kg:</p>
                    <p>${order.pricePerKg}</p>
                  </div>
                </div>

                {/* Total amount */}
                <div className="mb-2 flex justify-between">
                  <p className="font-bold">Total:</p>
                  <p>${order.totalPrice}</p>
                </div>

                {/* Line separator */}
                <hr className="border-t border-gray-300 my-2" />
                
                {/* Approval button */}
                <div className='flex justify-center mt-8'>
                  <button 
                    onClick={() => handleApprove(order.id)} 
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
                    disabled={order.status === 'approved'}
                  >
                    {order.status === 'approved' ? 'Approved' : 'Approve'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-between mt-20">
            <button 
              onClick={() => setCurrentPage(currentPage - 1)} 
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-800'}`}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-800'}`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl font-semibold text-gray-600">No orders available</p>
        </div>
      )}
    </div>
  );
}

export default Orders;
