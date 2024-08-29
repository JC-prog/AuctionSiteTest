import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import ProductGridSearch from '../Components/Carousel/ProductGridSearch';

interface AuthProps {
    isAuth?: boolean;
    user: string | null | undefined;
}

const useKeyword = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchPageKeyword: React.FC<AuthProps> = ({ user }) => {
    const keyword = useKeyword().get('keyword');
    const navigate = useNavigate();

    const handleSearch = (keyword: string | null) => {
        if (keyword?.trim()) {
            const formattedKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);
            navigate(`/category-search?keyword=${formattedKeyword}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold mb-4">Search Results</h1>

            {/* Display the search keyword if it exists */}
            {keyword && (
                <>
                    <p className="text-lg mb-4">Results for "{keyword}"</p>
                    <button 
                        type="submit" 
                        onClick={() => handleSearch(keyword)} // Pass a function reference
                        className="px-4 py-2 mb-2 text-sm font-medium bg-blue-400 hover:bg-blue-600 rounded-md"
                    >
                        Search By Category
                    </button>
                </>
            )}
            
            <ProductGridSearch username={user} keyword={keyword} />
        </div>
    );
};

export default SearchPageKeyword;
