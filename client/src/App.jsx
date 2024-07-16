import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import {UserContextProvider} from '../context/userContext'
import Dashboard from './pages/Dashboard'
import Admin from './components/Admin/Admin'
import User from './components/User/User'
import Task from '../../server/models/Task'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
function App() {

  return (
    <UserContextProvider>
  <Navbar></Navbar>
  <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
    <Routes>
      {/* <Route path='/' element={<Home/>}></Route> */}
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/admin' element={<Admin/>}></Route>
      <Route path='/user' element={<User/>}></Route>

    </Routes>
   </UserContextProvider>
  );
}

export default App
