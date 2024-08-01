import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { addItemToWatchlist } from '../../services/WatchListService';

type LikeButtonProps = {
  imageUrl: string;
  isLiked: boolean;
  username: string;
  itemId: number;
};

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, itemId, username }) => {
  const [liked, setLiked] = useState<boolean>(isLiked);

  const handleLikeToggle = async () => {
    try {
      await addItemToWatchlist(itemId, username);
      setLiked(!liked);
    } catch (error) {
      console.error('Failed to like the item:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleLikeToggle}
        className="absolute top-2 right-2 focus:outline-none"
      >
        {liked ? (
          <FaHeart className="text-red-500 hover:text-red-700 transition-colors duration-200" size={16} />
        ) : (
          <FaRegHeart className="text-gray-500 hover:text-red-500 transition-colors duration-200" size={16} />
        )}
      </button>
    </div>
  );
};

export default LikeButton;
