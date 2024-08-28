import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// icons
import { Search } from 'lucide-react';
import { RiAuctionLine } from "react-icons/ri";

// Components
import AuthenticatedNavbar  from '../Components/AuthComponents/AuthenticatedNavbar';
import UnAuthenticatedNavbar from '../Components/AuthComponents/UnAuthenticatedNavbar';

interface AuthProps {
  isAuth: boolean;
  user: string;
}

const PageHeader: React.FC<AuthProps> = ({ isAuth, user }) => {
  const [query, setQuery] = useState<string>('');
    const navigate = useNavigate()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?keyword=${query}`);
        }
    };

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <a href="/">
        <div className="flex gap-4 items-center flex-shrink-0">
          <RiAuctionLine size={40}/>
            EzAuction
        </div>
      </a>
      

      <form className="flex gap-4 flex-grow justify-center" onSubmit={ handleSearch }>
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-full border m-2 border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <button type="submit">
            <Search />
          </button>
        </div>
      </form>

      <div className="flex flex-shrink-0 md:gap-2">
        {isAuth ? <AuthenticatedNavbar user={ user } /> : <UnAuthenticatedNavbar />}
      </div>
    </div>
  );
}

export default PageHeader;
