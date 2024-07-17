import React from 'react'

// Components
import ItemCard from "../Components/ItemCard"


const ItemCarousel = () => {
    
  return (

         <div className="item-carousel-wrapper">
            <div>
                <h2>Newly Listed</h2>
                <hr />
            </div>

            <div className="item-cards-container">
              <ItemCard />
            </div>

        </div>
   
  )
}

export default ItemCarousel