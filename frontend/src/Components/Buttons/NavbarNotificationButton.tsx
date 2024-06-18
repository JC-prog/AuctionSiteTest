import React from 'react';
import { IoIosNotifications } from "react-icons/io";

interface NotificationButtonProps {
  redirectToNotification: () => void; // Define the type for handleLogout function
}

const NavbarNotificationButton: React.FC<NotificationButtonProps> = ({ redirectToNotification }) => {
  return (
    <button
      onClick={ redirectToNotification }
      style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
    >
      <IoIosNotifications style={{ fontSize: '1.5em', marginRight: '5px' }} />
      
    </button>
  );
};

export default NavbarNotificationButton;
