import React, { useState } from 'react';

// Style
import "../Styles/ItemCreatePage.scss";

// Components
import ItemForm from "../Components/ItemForm";

// Interface 
interface Item {
    title: String;
    endDate: Date;
    startPrice: number;
}

// Enum
const Categories = {
    larry: {
      id: "larry",
      name: "Larry Fine"
    },
    curly: {
      id: "curly",
      name: "Curly Howard"
    },
    moe: {
      id: "moe",
      name: "Moe Howard"
    }
  };

const ItemCreatePage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('Electronics');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      title,
      description,
      category
    };
    console.log('Form Data Submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="item-create-page-wrapper">
        <div className="item-create-details-container">
            <div className="item-create-img-container">
                <img src={"/upload-photo.png"} />
            </div>

            <div className="item-create-form-container">
              <h2>Create Item</h2>
                <ItemForm />
            </div>
        </div>
    </div>
  );
};

export default ItemCreatePage;
