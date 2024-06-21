import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AxiosResponse } from 'axios';

// Config
import api from '../config/api/loginApi';

// Interface
interface Item {
    itemTitle: String;
    description: String;
    startPrice: number;
}

const ItemPage = () => {
    const { itemID } = useParams<{ itemID: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Fetch Item
    useEffect(() => {
        const fetchItem = async () => {
          try {
            const response: AxiosResponse<Item> = await api.get(`api/item/${itemID}`);

                if (response.status !== 200) {
                throw new Error('Network response was not ok');
                }
                
                setItem(response.data);

            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchItem();
      }, [itemID]);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        { item ? (
            <div>
                <div>
                    <img src={"/test.jpg"} />
                </div>
    
                <div>
                    <div >
                        <h1>{ item.itemTitle }</h1>
                    </div>
                    
                    <div>
                        <p>{ item.description }</p>
                    </div>
                    
                    <div>
                        <h2>Price</h2>
                    </div>

                    <div >
                        <button>Bid</button>
                        <button>Trade</button>
                    </div>

                    <div>
                        <h2>Timer</h2>
                    </div>

                    <div>
                        <h3>Details</h3>
                    </div>

                    <div>
                        <h3>Seller</h3>
                    </div>
                </div>
            </div>
        ) : (
            <div>Item not found</div>
        )}
    </div>
  )
}

export default ItemPage