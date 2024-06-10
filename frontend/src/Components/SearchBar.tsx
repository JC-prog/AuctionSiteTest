import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const navigate = useNavigate()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?keyword=${query}`);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search..."
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
