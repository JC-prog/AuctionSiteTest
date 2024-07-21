import React from 'react'

interface PlanCardProps {
    title: string;
    price: string;
    description: string;
    details: string;
    buttonText: string;
    buttonLink: string;
  }

const PlanCard: React.FC<PlanCardProps> = ({ title, price, description, details, buttonText, buttonLink }) => {
    return (
      <div className="max-w-xs w-full bg-white border border-gray-200 p-6 rounded-lg shadow-md">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <p className="mt-4 text-4xl font-extrabold text-gray-900">{price}</p>
        <p className="mt-2 text-base text-gray-500">{description}</p>
        <p className="mt-4 text-base text-gray-500">{details}</p>
        <a href={buttonLink} className="mt-8 block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700">{buttonText}</a>
      </div>
    );
  };

export default PlanCard