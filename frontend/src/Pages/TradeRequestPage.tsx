import React, { useState } from 'react';
import TradeRequestBuyerView from '../Components/Views/TradeRequestBuyerView';
import TradeRequestSellerView from '../Components/Views/TradeRequestSellerView';
import { FaCartShopping } from "react-icons/fa6";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

// Interface
import IAuth from '../interfaces/IAuth';

const TradeRequestPage: React.FC<IAuth> = ({ isAuth, user }) => {
  const [buyerView, setBuyerView] = useState<boolean>(true);
  

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <FaArrowRightArrowLeft className="text-blue-600" /> Trade Requests
      </h2>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${buyerView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setBuyerView(true)}
        >
          Bought
        </button>
        <button
          className={`px-4 py-2 rounded ${!buyerView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setBuyerView(false)}
        >
          Sold
        </button>
      </div>
      {buyerView ? (
        <TradeRequestBuyerView username={user} />
      ) : (
        <TradeRequestSellerView username={user} />
      )}
    </div>
  );
};

export default TradeRequestPage;
