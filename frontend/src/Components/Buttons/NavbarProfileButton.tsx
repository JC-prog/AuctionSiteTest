import React from 'react';
import { FaUser } from 'react-icons/fa';

interface ProfileButtonProps {
  redirectToProfile: () => void; // Define the type for handleLogout function
}

const NavbarProfileButton: React.FC<ProfileButtonProps> = ({ redirectToProfile }) => {
  return (
    <button
      onClick={ redirectToProfile }
      style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
    >
      <FaUser style={{ fontSize: '1.5em', marginRight: '5px' }} />
      
    </button>
  );
};

export default NavbarProfileButton;
