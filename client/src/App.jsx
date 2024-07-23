
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
// import {UserContextProvider} from '../context/userContext'
import Admin from './components/Admin/Admin'
import User from './components/User/User'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../src/actions/authAction';




axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'white'; // Optional: to make text readable

    // Cleanup function to reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);
  
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      dispatch(loginUser({ token }));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/user' element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
