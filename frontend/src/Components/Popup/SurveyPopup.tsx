import React, { useState } from 'react';
import { checkInterestUser } from '../../services/UserService';
import { toast } from 'react-toastify';

interface SurveyPopupProps {
    username: string;
    onClose: () => void;
}

const SurveyPopup: React.FC<SurveyPopupProps> = ({ username, onClose }) => {
  const [responses, setResponses] = useState({
    productInterest: '',
    shoppingFrequency: '',
    purchaseFactors: [] as string[],
    paymentMethod: '',
    productDiscovery: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [name]: checked
          ? [...prevResponses.purchaseFactors, value]
          : prevResponses.purchaseFactors.filter((factor) => factor !== value)
      }));
    } else {
      setResponses({ ...responses, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
            const response = await checkInterestUser(username);
            const message = response.data;

            toast[response.status === 200 ? 'success' : 'error'](message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });

            if (response.status === 200) {
                setTimeout(() => window.location.reload(), 2000);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data || 'Failed!';
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        } finally {
            onClose();
        }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Let us enhance your experience!</h2>
        <form>
          <div className="mb-4">
            <label className="block font-bold mb-2">What type of products are you most interested in?</label>
            <select name="productInterest" value={responses.productInterest} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Books">Books</option>
              <option value="Beauty & Health">Beauty & Health</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">How often do you shop online?</label>
            <select name="shoppingFrequency" value={responses.shoppingFrequency} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Which factors influence your purchase decisions the most?</label>
            <div className="flex flex-wrap">
              {['Price', 'Brand', 'Customer Reviews', 'Product Features', 'Discounts and Offers'].map((factor) => (
                <label key={factor} className="mr-4">
                  <input
                    type="checkbox"
                    name="purchaseFactors"
                    value={factor}
                    checked={responses.purchaseFactors.includes(factor)}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  {factor}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">What is your preferred mode of payment?</label>
            <select name="paymentMethod" value={responses.paymentMethod} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select</option>
              <option value="Credit/Debit Card">Credit/Debit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Other">Other (please specify)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">How do you usually find new products on our website?</label>
            <select name="productDiscovery" value={responses.productDiscovery} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select</option>
              <option value="Browsing categories">Browsing categories</option>
              <option value="Using the search bar">Using the search bar</option>
              <option value="Recommendations from the website">Recommendations from the website</option>
              <option value="Email/newsletter promotions">Email/newsletter promotions</option>
              <option value="Social media ads">Social media ads</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyPopup;
