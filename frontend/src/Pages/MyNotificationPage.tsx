// pages/MyNotificationPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { BsArrowRightShort } from 'react-icons/bs';
import axios from 'axios';
import IAuth from '../interfaces/IAuth';
import INotification from '../interfaces/INotification';

// API Function Call
import { fetchNotification } from '../services/NotificationService';

const MyNotificationPage: React.FC<IAuth> = ({ isAuth, user, role }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    const fetchUserNotifications = async () => {
      console.log(user);
      try {
        const response = await fetchNotification(user);
        setNotifications(response.data.content);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchUserNotifications();
    
  }, [isAuth, user]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <MdOutlineNotificationsActive className="text-indigo-600" /> Notifications
      </h2>
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map(notification => (
            <li
              key={notification.id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
            >
              <p className="text-lg font-bold text-gray-800 mb-2">{notification.notificationHeader}</p>
              <p className="text-gray-600 mb-2">{notification.notificationMessage}</p>
              <p className="text-gray-500 mb-2">
                <strong>Item:</strong>
                <Link
                  to={`/item/${notification.itemId}`}
                  className="text-indigo-600 hover:text-indigo-800 ml-1"
                >
                  View Item <BsArrowRightShort className="inline" />
                </Link>
              </p>
              <p className="text-sm text-gray-400">
                <strong>Timestamp:</strong> {new Date(notification.notificationTimeStamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-500">No notifications available.</p>
      )}
    </div>
  );
};

export default MyNotificationPage;
