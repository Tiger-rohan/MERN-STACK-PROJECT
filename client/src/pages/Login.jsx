// import { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import './pages.css';

// export default function Login() {
//     const navigate = useNavigate();
//     const [data, setData] = useState({
//         email: "",
//         password: "",
//     });

//     const loginUser = async (e) => {
//         e.preventDefault();
//         const { email, password } = data;
//         try {
//             const { data: responseData } = await axios.post('/login', { email, password });
//             if (responseData.error) {
//                 toast.error(responseData.error);
//             } else {
//                 // Check user role and navigate accordingly
//                 const { role } = responseData; // Assuming responseData contains the user object with role
//                 setData({});
//                 if (role === 'admin') {
//                     navigate('/admin');
//                 } else if (role === 'user') {
//                     navigate('/user');
//                 } else {
//                     navigate('/dashboard'); // Fallback if role is unrecognized
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error("An error occurred. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={loginUser}>
//                 <label>
//                     Email:
//                 </label>
//                 <input 
//                     type="email" 
//                     name="email" 
//                     value={data.email} 
//                     onChange={(e) => setData({ ...data, email: e.target.value })} 
//                 />
//                 <label>
//                     Password:
//                 </label>
//                 <input 
//                     type="password" 
//                     name="password" 
//                     value={data.password} 
//                     onChange={(e) => setData({ ...data, password: e.target.value })} 
//                 />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }


import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import './pages.css';

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const { data: responseData } = await axios.post('/login', { email, password });
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                // Check user role and navigate accordingly
                const { role } = responseData; // Assuming responseData contains the user object with role
                setData({});
                if (role === 'admin') {
                    navigate('/admin');
                } else if (role === 'user') {
                    navigate('/user');
                } else {
                    navigate('/dashboard'); // Fallback if role is unrecognized
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={loginUser}>
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
                <button type="submit">Login</button>
            </form>
            <div className="register-link">
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </div>
    );
}
