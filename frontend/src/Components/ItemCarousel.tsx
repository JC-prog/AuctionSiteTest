import React from 'react'

// Components
import ItemCard from "../Components/ItemCard"

// Styles
import "../Styles/ItemCarousel.scss"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const ItemCarousel = () => {
    
  return (

         <div className="item-carousel-wrapper">
            <div>
                <h2>Newly Listed</h2>
                <hr />
            </div>

            <div className="item-cards-container">
                <div>
                    <ItemCard />
                </div>
                <div>
                    <ItemCard />
                </div>
                <div>
                    <ItemCard />
                </div>
            </div>

        </div>
   
  )
}

export default ItemCarousel