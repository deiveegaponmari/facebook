import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import { useData } from './context/data';
import { Grid2 } from '@mui/material';
import Navbar from './components/Navbar';
import FaceBookPage from './pages/FaceBookPage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProfilePage from './pages/ProfilePage';


function App() {
  
  const { isLoggedIn } = useData();
  const mycomp = () => {
    return (<Grid2>
      <Navbar/>
      <FaceBookPage/>
    </Grid2>
    )
  }
  return (
    <>
      <div className='container'>
        <Routes>
          {!isLoggedIn && <>
            <Route Component={Signup} path='/'></Route>
            <Route Component={Login} path='/login'></Route>
          </>
          }
          {
            isLoggedIn && <>
              <Route path='/:home' Component={mycomp}></Route>
           <Route path='/profile' Component={ProfilePage}></Route>

            </>
          }
          
           
          <Route path='*' Component={NotFound}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App;