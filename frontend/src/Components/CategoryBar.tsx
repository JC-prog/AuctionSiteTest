
// Icons
import { FaComputer} from 'react-icons/fa6';
import { FaBrush, FaCar } from "react-icons/fa";
import { IoBasketball } from "react-icons/io5";

const CategoryBar = () => {
  return (
    <div>
      <div className="category-bar-div-1">
        <FaComputer />
        <h1>Electronics</h1>
      </div>

      <div className="category-bar-div-2">
      <IoBasketball />
      <h1>Sports</h1>
      </div>

      <div className="category-bar-div-3">
      <FaBrush />
        <h1>Arts</h1>
      </div>

      <div className="category-bar-div-3">
      <FaCar />
        <h1>Cars</h1>
      </div>

    </div>
  )
}

export default CategoryBar
