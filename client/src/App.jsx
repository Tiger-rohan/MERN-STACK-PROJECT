import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Remove the curly braces
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

import rootReducer from './reducers/rootReducers'; // Adjust the path as necessary
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import ProjectCreation from './components/Admin/components/ProjectCreation'; // Adjust the path as necessary
import CreateTask from './components/Admin/components/Tasks/CreateTasks' // Ensure to import CreateTask

import { UserContextProvider } from '../context/userContext'; // Adjust the path as necessary

import './App.css';
import { Routes, Route } from 'react-router-dom';
// import Navbar from '../src/components/Navbar';

import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import { useEffect } from 'react';

import Admin from './components/Admin/Admin';
import User from './components/User/User';


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = '#28282B';
    document.body.style.color = 'white'; // Optional: to make text readable

    // Cleanup function to reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  return (
    <Provider store={store}>
      <UserContextProvider>
        <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/user' element={<User />} />
          <Route path='/project-creation' element={<ProjectCreation />} />
          <Route path='/create-task' element={<CreateTask />} /> {/* Add CreateTask route */}
        </Routes>
      </UserContextProvider>
    </Provider>

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
