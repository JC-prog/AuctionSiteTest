import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AxiosResponse } from 'axios';

// Config
import api from '../config/api/loginApi';

// Styles
import "../Styles/ItemPage.scss";

// Interface
interface Item {
    title: String;
    description: String;
    startPrice: number;
}

const ItemPage = () => {
    const { itemID } = useParams<{ itemID: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Fetch User
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
    <div>
        { item ? (
            <div className="item-details-container">
                <div className="item-pic-placeholder">
                    <img src={"/test.jpg"} />
                </div>
    
                <div className="item-content-container">
                    <h2>{ item.title }</h2>
                    <p>{ item.description }</p>
                    <div className="item-action-buttons">
                        <button>Bid</button>
                        <button>Trade</button>
                    </div>
                </div>
            </div>
        ) : (
            <div>User not found</div>
        )}
    </div>
  )
}

export default ItemPage