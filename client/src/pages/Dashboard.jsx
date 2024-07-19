import { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import './pages.css'; // Import the CSS file

export default function Dashboard() {

  const {user} = useContext(UserContext);
  
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      {!!user && (<h1 className="user-greeting">Hi {user.name}!</h1>)}
    </div>
  )
}