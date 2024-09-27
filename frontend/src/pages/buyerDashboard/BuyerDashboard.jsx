import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const BuyerDashboard = ({ signer }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-primary-200 text-black text-xl p-4">
        <ul className="space-y-2 mt-24">
          <li>
            <Link to="purchase-commodity" className="block p-2 hover:bg-primary-100 rounded-xl">
              Purchase Commodity
            </Link>
          </li>
          <li>
            <Link to="my-purchases" className="block p-2 hover:bg-primary-100 rounded-xl">
              View My Purchases
            </Link>
          </li>
          <li>
            <Link to="dispute" className="block p-2 hover:bg-primary-100 rounded-xl">
              Dispute
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet /> {/* Renders the matched child route component */}
      </main>
    </div>
  );
};

export default BuyerDashboard;
