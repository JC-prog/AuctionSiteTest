import React from 'react';
import { IoExitOutline } from 'react-icons/io5'; // Importing IoExitOutline from react-icons/io5

interface LogoutButtonProps {
  handleLogout: () => void; // Define the type for handleLogout function
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ handleLogout }) => {
  return (
    <button
      onClick={handleLogout}
      style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
    >
      <IoExitOutline style={{ fontSize: '1.5em', marginRight: '5px' }} />
      
    </button>
  );
};

export default LogoutButton;
