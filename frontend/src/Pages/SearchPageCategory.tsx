import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import ProductGridSearchCategory from '../Components/Carousel/ProductGridSearchCategory';

interface AuthProps {
    isAuth?: boolean;
    user: string | null | undefined;
}

const useKeyword = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchPageCategory: React.FC<AuthProps> = ({ user }) => {
    const keyword = useKeyword().get('keyword');
    const navigate = useNavigate();

    const handleSearch = (keyword: string | null) => {
        if (keyword?.trim()) {
            navigate(`/search?keyword=${keyword}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold mb-4">Search Results</h1>

            {/* Display the search keyword if it exists */}
            {keyword && <p className="text-lg mb-4">Results for "{keyword}"</p>}
            <button 
                type="submit" 
                onClick={() => handleSearch(keyword)} 
                className="px-4 py-2 mb-2 text-sm font-medium bg-blue-400 hover:bg-blue-600 rounded-md"
            >
                Search By Keyword
            </button>

            <ProductGridSearchCategory username={user} keyword={keyword} />
        </div>
    );
};

export default SearchPageCategory;
