import React,{useState} from 'react';
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
import Friends from './components/Friends';


function App() {
  
  const [selectedUser, setSelectedUser] = useState(null)
  const [friendReqUser, setfriendReqUser] = useState([])
  const[confirmUser,setconfirmUser]=useState();
  console.log('friendReqUser :--- ', friendReqUser)
  const { isLoggedIn } = useData();
  const mycomp = () => {
    return (<Grid2>
      <Navbar setSelectedUser={setSelectedUser} selectedUser={selectedUser} setfriendReqUser={setfriendReqUser}
       friendReqUser={friendReqUser} confirmUser={confirmUser}/>
      <FaceBookPage selectedUser={selectedUser}/>
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
            {/* <Route path='/friends' Component={Friends} friendReqUser={friendReqUser}></Route> */}
            <Route path="/friends" element={<Friends friendReqUser={friendReqUser} selectedUser={selectedUser} setconfirmUser={setconfirmUser}/>} />
            </>
          }
          
           
          <Route path='*' Component={NotFound}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App;