import React from 'react'
import { useNavigate } from 'react-router-dom';

// Style
import "../Styles/ItemCard.scss"

// interface
interface Item {
    itemId: number;
    itemTitle: string;
    itemCategoryNum: number;
    minSellPrice: number;
}

interface ItemCardProps{
    item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ( { item }  ) => {
    const navigate = useNavigate();


    // Redirect to Item Page onclick
    const navigateToItem = () => {

        navigate(`/item/${ item.itemId }`)

    }


  return (
        <div className="item-card-container" onClick={navigateToItem}>
            <div className="item-card-img-container">
                <img src="/test.jpg"></img>
            </div>
            
            <div className="item-card-content-container">
                <h2>{ item.itemTitle }</h2>
                <p>Time Left</p>
                <p>1 Bids</p>
                <p>$ 1.00 </p>
            </div>
        </div>
  )
}

export default ItemCard