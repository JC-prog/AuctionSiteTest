import React, { useEffect, useState } from 'react';

const AdPlacementCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ads = [
    { id: 1, imageUrl: '/bike.jpg' }, // Adjust the path according to your public folder structure
    { id: 2, imageUrl: '/images/ad2.jpg' },
    { id: 3, imageUrl: '/images/ad3.jpg' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [ads.length]);

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg h-64 z-10">
      {ads.map((ad, index) => (
        <div
          key={ad.id}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg relative">
            <img
              src={ad.imageUrl}
              alt={`Ad ${ad.id}`}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Ad {ad.id}
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {ads.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdPlacementCarousel;
