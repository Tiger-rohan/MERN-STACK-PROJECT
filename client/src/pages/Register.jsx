import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import './pages.css';

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    user_name: "",
    email: "",
    password: "",
    role: ""
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { user_name, email, password, role } = data;
    try {
        // First, register the user
        const { data: responseData } = await axios.post("/register", { user_name, email, password, role });

        if (responseData.error) {
            toast.error(responseData.error);
        } else {
            // Assuming responseData contains user_id from the backend registration response
            const { user_id } = responseData;

            // Post user details to /userDetails API
            const userDetailsResponse = await axios.post("/api/userDetails", {
                user_id, // Use the user_id from the registration response
                user_name,
                email,
                role,
                ProjectDescription: []
            });

            if (userDetailsResponse.status === 201) {
                toast.success("Registration successful. Please login");

                // Reset form data
                setData({ user_name: "", email: "", password: "", role: "" });

                // Redirect to login page
                navigate('/');
            } else {
                toast.error("Failed to save user details. Please try again.");
            }
        }
    } catch (error) {
        console.log(error);
        toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Username:</label>
        <input 
          type="text" 
          name="user_name" 
          value={data.user_name} 
          onChange={(e) => setData({ ...data, user_name: e.target.value })} 
        />
        
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={data.email} 
          onChange={(e) => setData({ ...data, email: e.target.value })} 
        />
        
        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={data.password} 
          onChange={(e) => setData({ ...data, password: e.target.value })} 
        />
        
        <label>Role:</label>
        <select 
          name="role" 
          value={data.role} 
          onChange={(e) => setData({ ...data, role: e.target.value })} 
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        
        <button type="submit">Submit</button>
      </form>
      <div className="login-link">
        <p>Already have an account? <Link to="/">Sign in</Link></p>
      </div>
    </div>
  );
}
