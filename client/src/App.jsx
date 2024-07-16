import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskManager from './pages/TaskManager';
import CreateProject from './pages/CreateProject'
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';
; // Import the CreateProject component

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
<<<<<<< HEAD
  <<<<<<< HEAD
      <Route path='/admin' element={<Admin/>}></Route>
      <Route path='/user' element={<User/>}></Route>
=======
      <Route path='/task-manager' element={<TaskManager />} />
        <Route path='/create-project' element={<CreateProject />} /> {/* Add the route for CreateProject */}
  >>>>>>> 8b5ae7c (TaskManager added)
    </Routes>
=======
        <Route path='/task-manager' element={<TaskManager />} />
        <Route path='/create-project' element={<CreateProject />} /> {/* Add the route for CreateProject */}
      </Routes>
>>>>>>> e4ff93ecf9f64861c6366b27b2518f57ddf0af95
    </UserContextProvider>
  );
}

export default App;
