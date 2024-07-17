import './App.css'
import {Routes, Route} from 'react-router-dom'
// import Navbar from '../src/components/Navbar'

import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import {UserContextProvider} from '../context/userContext'

import Admin from './components/Admin/Admin'
import User from './components/User/User'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/user' element={<User />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
