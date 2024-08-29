import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedQuery = query.trim();
        navigate(`/search?keyword=${trimmedQuery}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center bg-gray-700 text-gray-100 rounded-md w-full max-w-lg">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent border-none text-sm px-4 py-2 flex-grow focus:outline-none"
                placeholder="Search..."
            />
            <button type="submit" className="px-4 py-2 text-sm font-medium hover:bg-gray-600 rounded-md">
                <AiOutlineSearch size={20} />
            </button>
        </form>
    );
};

export default SearchBar;
