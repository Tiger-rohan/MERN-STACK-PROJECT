import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import './pages.css'; // Import the CSS file

export default function Dashboard() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    // Clear user context
    setUser(null);

    // Remove user token from cookies
    const cookies = document.cookie.split('; ');
    cookies.forEach(cookie => {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === 'token') {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });

    // Alternatively, if you have a specific token key, you can directly remove it
    // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      {!!user && (
        <>
          <h1 className="user-greeting">Hi {user.name}!</h1>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}
