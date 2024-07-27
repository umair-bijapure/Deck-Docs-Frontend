import React, { ReactNode } from 'react';
import { Socket,io } from 'socket.io-client';
import { Project } from './projectGrid';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
interface Notification {
  id: string;
  color: string;
  path: string;
  message: string;
}

interface NotificationsProps {
  notifications: Notification[];
}

// components/Header.tsx


export const NotificationComponent: React.FC<NotificationsProps> = ({ notifications }) => {
  return (
    <>
      {notifications.map((toast) => (
        <div
          key={toast.id}
          id={toast.id}
          className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-md border `}
          role="alert"
        >
          <div
            className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${toast.color}-500 bg-${toast.color}-100 rounded-lg dark:bg-${toast.color}-800 dark:text-${toast.color}-200 border border-${toast.color}-300`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d={toast.path} />
            </svg>
            <span className="sr-only">Icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">{toast.message}</div>
          <button
            type="button"
            className={`ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300`}
            data-dismiss-target={`#${toast.id}`}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      ))}
    </>
  );
};




// SpinnerProps.ts
export interface SpinnerProps {
  width?: string;
  height?: string;
  color?: string;
  message?:string;
}


export const CommonSpinner: React.FC<SpinnerProps> = ({ width = '8', height = '8', color = 'text-gray-200',message="Loading.." }) => {
  return (
    <>
      <svg
        aria-hidden="true"
        className={`inline w-${width} h-${height} mr-2 ${color} animate-spin fill-green-500`}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
     <span className="sr-only">{message}</span>
     </>
  );
};


// AlertProps.ts
export interface AlertProps {
  message: string;
  type?: 'error' | 'warning' | 'success' | 'info';
}


export const CommonAlert: React.FC<AlertProps> = ({ message, type = 'error' }) => {
  const alertColors = {
    error: 'red',
    warning: 'yellow',
    success: 'green',
    info: 'blue',
  };

  return (
    <div
      className={`flex items-center w-full max-w-xs p-2 sm:p-4 sm:mb-4 text-gray-500 bg-white rounded-lg shadow-md border`}
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${alertColors[type]}-500 bg-${alertColors[type]}-100 rounded-lg dark:bg-${alertColors[type]}-800 dark:text-${alertColors[type]}-200 border border-${alertColors[type]}-300`}
      >
        {type === 'error' && (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
              fill="currentColor"
            />
          </svg>
        )}
        <span className="sr-only">Icon</span>
      </div>
      <div className="ms-3 text-sm text-gray-500 font-normal">{message}</div>
      <button
        type="button"
        className={`ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300`}
        data-dismiss-target={``}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    </div>
  );
};

interface NotificationIconProps {
  path: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ path }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d={path} />
    </svg>
  );
};


interface SuccessNotificationProps {
  message: string;
}

export const SuccessNotification: React.FC<SuccessNotificationProps> = ({ message }) => {
  return (
    <div className="bg-green-100 p-4 text-white rounded-md shadow-md mb-4">
      <div className="flex items-center">
        <div className="mr-4">
          <NotificationIcon path='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
        </div>
        <div>
          <p className='text-green-500'>{message}</p>
        </div>
      </div>
    </div>
  );
};





interface DangerNotificationProps {
  message: string;
}

export const DangerNotification: React.FC<DangerNotificationProps> = ({ message }) => {
  return (
    <div className="bg-red-500 p-4 text-white rounded-md shadow-md mb-4">
      <div className="flex items-center">
        <div className="mr-4">
          <NotificationIcon  path='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z' />
        </div>
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};


interface WarningNotificationProps {
  message: string;
}

export const WarningNotification: React.FC<WarningNotificationProps> = ({ message }) => {
  return (
    <div className="bg-orange-500 p-4 text-white rounded-md shadow-md mb-4">
      <div className="flex items-center">
        <div className="mr-4">
          <NotificationIcon path="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
        </div>
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

// components/NotificationsList.tsx




interface NotificationData {
  // Define your notification data structure here
  user:string;
  title:string;
  type:string;
  text:string;
  read:boolean;

}



interface Notification {
  _id: string;
  text: string;
  read: boolean;
  // Add other properties as needed
}
// Define props for NotificationComponent
interface NotificationsProps {
  userId: string;
  // Add more props as needed
}


const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(`${process.env.NEXT_PUBLIC_API_URL}`);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
  }, [socket]);

  return socket;
};

export const Notificationsss: React.FC<NotificationsProps> = () => {
  const socket = useSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get<{ notifications: Notification[] }>(`${process.env.NEXT_PUBLIC_API_URL}/notifications`);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('foldersAdded', (folders: any[]) => {
        // Handle new folders here
      });
      socket.on('projectsAdded', (projects: any[]) => {
        // Handle new projects here
      });
      socket.on('usersAdded', (users: any[]) => {
        // Handle new users here
      });
    }
  }, [socket]);
  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification._id} className="mb-2">
            {notification.text} {!notification.read && <span className="text-red-500">(Unread)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};



interface NotificationProps {
  notification: {
    _id: string;
    title: string;
    this_notification_user:string;
    text: string;
    projectId?: string;
    folderId?: string;
    userIds?: string[];
    type?:number;
    senderId:string;
  };
  onDelete: (notificationId: string) => void;
}


export const Notification: React.FC<NotificationProps> = ({ notification, onDelete }) => {
  const handleDelete = () => {
    onDelete(notification._id);
  };
  let project_name=notification?.projectId;
  let senderId=notification?.senderId;
  let this_notification_user=notification?.this_notification_user

  return (
    <div className="flex flex-col p-4 border-b">

     

        <h1 className="font-semibold">{notification.title}</h1>
       
        <h1 className="font-semibold">Project Name:{notification.projectId}</h1>

    
    
      {/* <h6>{notification.type}</h6> */}
      <p className="text-gray-600">{notification.text}</p>
      <button onClick={handleDelete} className="text-sm text-red-500 mt-2">
        Delete
      </button>
    </div>
  );
};


interface NotificationsListProps {
  notifications: {
    _id: string;
    title: string;
    this_notification_user:string;
    text: string;
    projectId?: string;
    folderId?: string;
    userIds?: string[];
    type?:number;
    senderId:string;
  }[];
  onDelete: (notificationId: string) => void;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({ notifications, onDelete }) => {
  return (
    <div>
      {notifications.map(notification => (
        <Notification key={notification._id} notification={notification} onDelete={onDelete} />
      ))}
    </div>
  );
};








export const NotificationIconTabSection: React.FC <NotificationsProps> = ({ userId }) => {
 
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
  
        const response = await axios.get(`/api/notifications/${userId}`);
        const notifications = response.data;
        const unreadNotifications = notifications.filter((notification: { read: any; }) => !notification.read);
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error('Error fetching unread notifications:', error);
      }
    };

    fetchUnreadCount();

    // You can set up WebSocket or polling for real-time updates to unread count

  }, []);

  const handleNotificationClick = () => {
    // router.push('/notifications');
  };

  return (
    <div className="relative">
      <button className="relative" onClick={handleNotificationClick}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {unreadCount > 0 && <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{unreadCount}</div>}
      </button>
    </div>
  );
};




interface Notification {
  _id: string;
  read: boolean;
  text: string;
  projectId?: string;
  userId?: string;
  folderId?: string;
}

interface NotificationsProps {
  userId: string;
}

export const NotificationsPanel: React.FC<NotificationsProps> = ({ userId }) => {

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/notifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // You can set up WebSocket or polling for real-time updates to notifications
  }, []);

  const handleNotificationClick = (notificationId: string, projectId?: string, userId?: string, folderId?: string) => {
    if (projectId) {
      // Use component instead of router.push
      // Example: <ProjectComponent projectId={projectId} />
    } else if (userId) {
      // Use component instead of router.push
      // Example: <UserComponent userId={userId} />
    } else if (folderId) {
      // Use component instead of router.push
      // Example: <FolderComponent folderId={folderId} />
    }

    // Mark notification as read on the backend
    markNotificationAsRead(notificationId);
  };

  const markNotificationAsRead = (notificationId: string) => {
    // Implement markNotificationAsRead function
  };

  return (
    <div className="absolute right-0 top-12 bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Notifications</h3>
      <div>
        {notifications.map(notification => (
          <div key={notification._id} className={`py-2 cursor-pointer ${notification.read ? '' : 'bg-blue-100'}`} onClick={() => handleNotificationClick(notification._id, notification.projectId, notification.userId, notification.folderId)}>
            <p>{notification.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};




