import React, { useState } from 'react';

// Style
import "../Styles/ItemCreatePage.scss";

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
    <div className="item-create-container">
        <div className="item-create-form-container">
            <h1>Create New Item</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                </div>

                <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                </div>

                <div>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="Electronics">Electronics</option>
                    <option value="Arts">Arts</option>
                </select>
                </div>

                <div>
                    <label htmlFor="auction-type">Auction Type:</label>
                    <select>
                        <option value="Low Start High">Low Start High</option>
                        <option value="Price Up">Price Up</option>
                    </select>
                </div>


                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
  );
};

export default ItemCreatePage;
