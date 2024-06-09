import React from 'react'


// interface
interface Item {
    title: String;
    endDate: Date;
    startPrice: number;
}

interface ItemProps {
    item: Item;
}

const ItemCard: React.FC<ItemProps> = ( { item } ) => {
  return (
    <div className="item-card-container">
            <div>
                <img src="/test.jpg"></img>
            </div>
            
            <h2>{ item.title }</h2>
            <p>{ item.endDate.toString() }</p>
            <p>1 Bids</p>
            <p>{ item.startPrice }</p>
        </div>
  )
}

export default ItemCard