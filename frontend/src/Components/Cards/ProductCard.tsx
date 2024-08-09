import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../config/Api';
import Item  from '../../interfaces/Item';
import LikeButton from '../../Components/Interactive/LikeButton';
import Timer from '../../Components/Timer';

type ItemListProps = {
  item: Item;
  username: string | null | undefined;
};

const ProductCard: React.FC<ItemListProps> = ({ item, username }) => {
  const { itemId, itemTitle, itemPhoto, currentPrice, endDate } = item;
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemImage = async (itemId: number) => {
      try {
        const response = await api.get(`/api/item/image/${itemId}`, { responseType: 'arraybuffer' });
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result as string);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Failed to fetch item image:', error);
      }
    };

    if (!itemPhoto) {
      fetchItemImage(itemId);
    } else {
      setImageSrc(`data:image/jpeg;base64,${itemPhoto}`);
    }
  }, [itemId, itemPhoto]);

  return (
    <div className="w-full max-w-sm mx-auto rounded overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white">
        <Link to={`/item/${itemId}`} className="block">
            <img className="w-full h-40 object-cover" src={imageSrc || '/upload-photo.png'} alt={itemTitle} />
            <div className="px-4 py-2">
                <div className="font-bold text-md mb-1">{itemTitle}</div>
            </div>
        </Link>
        <div className="px-4 py-2">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                <p className="text-gray-700 text-sm">${currentPrice.toFixed(2)}</p>
                    
                </div>
                <div className="flex items-center justify-end">
                    <LikeButton isLiked={false} username={username} itemId={itemId} />
                </div>
            </div>
        </div>
        <div className="px-4 py-2">
            <Timer endTime={endDate} />
        </div>
    </div>
  );
};

export default ProductCard;
