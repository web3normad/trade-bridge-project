// Orders.jsx
import React, { useState } from 'react';

const Orders = () => {
  // Sample order data
  const sampleOrders = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    commodity: `Commodity ${index + 1}`,
    quantity: `${Math.floor(Math.random() * 300) + 100} tons`,
    status: 'pending', // Initial status
  }));

  const [orders, setOrders] = useState(sampleOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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
    <div className="mt-10 w-[1020px] mx-20 ">
      <h1 className="text-3xl font-bold mb-4">Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentItems.map(order => (
          <div key={order.id} className="border rounded-xl p-4 bg-primary-200 shadow-md">
            <div className="mb-2">
              <p className="font-bold">Commodity</p>
              <p>{order.commodity}</p>
            </div>
            <div className="mb-2">
              <p className="font-bold">Quantity</p>
              <p>{order.quantity}</p>
            </div>
            <div className="mb-2">
              <p className="font-bold">Status</p>
              <p>{order.status}</p>
            </div>
            <button 
              onClick={() => handleApprove(order.id)} 
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
              disabled={order.status === 'approved'}
            >
              {order.status === 'approved' ? 'Approved' : 'Approve'}
            </button>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
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
    </div>
  );
}

export default Orders;
