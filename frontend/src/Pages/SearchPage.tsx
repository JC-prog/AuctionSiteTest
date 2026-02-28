import React from 'react';
import { useLocation } from 'react-router-dom';

// Components
import ProductGridSearch from '../Components/Carousel/ProductGridSearch'

interface AuthProps {
    isAuth?: boolean;
    user: string | null | undefined;
  }

const useKeyword = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage: React.FC<AuthProps> = ({ user }) => {
    const keyword = useKeyword().get('keyword');
      
      return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold mb-4">Search Results</h1>
          
          {/* Display the search keyword if it exists */}
          {keyword && <p className="text-lg mb-4">Results for "{keyword}"</p>}
          
          <ProductGridSearch username={user} keyword={keyword}/>
        </div>
      );
    };
    
    export default SearchPage;