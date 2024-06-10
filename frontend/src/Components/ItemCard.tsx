import React from 'react'

// Style
import "../Styles/ItemCard.scss"

// interface
interface Item {
    title: String;
    endDate: Date;
    startPrice: number;
}

interface ItemProps {
    item: Item;
}

const ItemCard= () => {
  return (
        <div className="item-card-container">
            <div className="item-card-img-container">
                <img src="/test.jpg"></img>
            </div>
            
            <div className="item-card-content-container">
                <h2>Title</h2>
                <p>Time Left</p>
                <p>1 Bids</p>
                <p>$ 1.00 </p>
            </div>
        </div>
  )
}

export default ItemCard