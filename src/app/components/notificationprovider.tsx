// components/NotificationListener.tsx
import { useEffect } from 'react';
import { toast } from 'react-toastify'; // Importing react-toastify

const NotificationListener = () => {
    useEffect(() => {
        // Ensure service worker is ready
        if ('serviceWorker' in navigator) {
          console.log("Setting up listener for service worker messages");
    
          navigator.serviceWorker.addEventListener('message', (event) => {
            console.log("Message received from service worker:", event.data);
    
            const { title, body, url } = event.data; // Extract title, body, and URL from the event
            const redirectUrl = url || 'https://www.example.com'; // Fallback URL
    
            showCustomToast(title, body, redirectUrl); // Show the toast notification
          });
        }
      }, []);

  const showCustomToast = (title: string, message: string, url: string) => {
    toast.info(
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
        <button
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '8px',
          }}
          onClick={() => window.open(url, '_blank')}
        >
          View
        </button>
      </div>,
      {
       
        autoClose: 5000, // Toast will close after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'colored', // You can change the theme here if needed
      }
    );
  };

  return null; // This component only sets up listeners and doesn't render anything
};

export default NotificationListener;
