import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa'; // Import the bell icon

const NotificationSystem = () => {
    const [notificationCount, setNotificationCount] = useState(0);
  
    const incrementNotification = () => {
      setNotificationCount(notificationCount + 1);
    };
  
    return (
      <div>
        <FaBell onClick={incrementNotification} />
        {notificationCount > 0 && <span>{notificationCount}</span>}
      </div>
    );
  };
  
  export default NotificationSystem;