import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './pages.css';

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = data;
    try {
      const { data: responseData } = await axios.post("/register", { name, email, password, role });

      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({ name: "", email: "", password: "", role: "" });
        toast.success("Registration successful. Please login");
        console.log(responseData);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>
          Username:
        </label>
        <input 
          type="text" 
          name="username" 
          value={data.name} 
          onChange={(e) => setData({ ...data, name: e.target.value })} 
        />
        
        <label>
          Email:
        </label>
        <input 
          type="email" 
          name="email" 
          value={data.email} 
          onChange={(e) => setData({ ...data, email: e.target.value })} 
        />
        
        <label>
          Password:
        </label>
        <input 
          type="password" 
          name="password" 
          value={data.password} 
          onChange={(e) => setData({ ...data, password: e.target.value })} 
        />
        
        <label>
          Role:
        </label>
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
    </div>
  );
}
