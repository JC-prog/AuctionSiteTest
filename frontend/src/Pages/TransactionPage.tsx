import React from 'react';

type Item = {
    itemId: number;
    image: string;
    title: string;
    price: number;
};

type ItemProps = {
    items: Item[];
};

const TransactionPage: React.FC<ItemProps> = ({ items }) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      
    </div>
  );
};

export default TransactionPage;
