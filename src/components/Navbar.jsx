import { Grid2, ListItem, TextField, Autocomplete, Drawer, IconButton, Typography, List, ListItemAvatar, Avatar, ListItemText, Badge } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Chat from "./Chat";
import socket from "../middleware/socket";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useData } from "../context/data";
import PeopleIcon from '@mui/icons-material/People';


export default function Navbar({ setSelectedUser, selectedUser, setfriendReqUser, friendReqUser, confirmUser }) {
    const navigate = useNavigate();
    //  const [friendlistopen, setfriendlistopen] = useState(false)
    const [newMessage, setNewMessage] = useState(false);
    const [open, setOpen] = useState(false);
    const [friendData, setFriendData] = useState([])
    const [search, setSearch] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [autoData, setAutoData] = useState([]);

    const [notification, setNotification] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const { decodedToken, isLoggedIn } = useData();
    const [counter, setCounter] = useState(0);
    const currentUserId = decodedToken || {};
    console.log(currentUserId);
    console.log("confirmuser",confirmUser)

    // Fetch all user data for autocomplete
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/data`)
            .then((response) => {
                setAutoData(response.data.map(user => ({
                    label: user.username,
                    id: user._id
                })));
            })
            .catch((error) => console.log(error));
    }, []);

 //handle socket
 useEffect(() => {
    socket.on("receiveFriendRequest", ({ senderId }) => {
        console.log("You received a friend request from:", senderId);
        setNotification("You have a new friend request!");
        setShowNotification(true);
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${senderId}`)
        .then((res)=>{
            setfriendReqUser(res.data)
        })
    });

    return () => {
        socket.off("receiveFriendRequest");
    };
}, []);
    useEffect(() => {
        let intervalId;
        intervalId = setInterval(() => {
           //handle online users registration
            socket.emit("registerUser", currentUserId?.userId);
            //handle friend request
            socket.on("receiveFriendRequest", ({ senderId, receiverId }) => {
                console.log("receiverId:-- ", receiverId);
                console.log("currentUserId.userId:-- ", currentUserId.userId);
                if (receiverId === currentUserId.userId) {
                    console.log("You received a friend request!");
                }
            });

            socket.on("notification", ({message,receiverId}) => {
                console.log('message :------ message :-- ', message)
                /* let apiData = [{name:'vvv', image: ''}];
                console.log("data :-- ",[apiData]); */
                console.log("receiverId :-- ",receiverId);
                //api call
              /*   axios.get("") */
                //setfriendReqUser(apiData);
                if(receiverId ==currentUserId.userId){
                    setNotification(message);
                    setShowNotification(true)
                }
              
            })

            socket.on("friendRequestCanceled", ({ senderId, receiverId }) => {
                if (receiverId === currentUserId.userId) {
                    console.log("A friend request was canceled!");
                }
            });

            return () => {
                socket.off("receiveFriendRequest");
                socket.off("friendRequestCanceled");
            };
        }, 2000);


        return () => clearInterval(intervalId);
    }, []);
    //handle user register and friendRequest notification
   /*  useEffect(() => {
        socket.emit("registerUser", currentUserId.userId);

        socket.on("receiveFriendRequest", ({ senderId, receiverId }) => {
            if (receiverId === currentUserId.userId) {
                console.log("You received a friend request!");
            }
        });

        socket.on("notification", (message) => {
            setNotification(message);
            setShowNotification(true)
        })

        socket.on("friendRequestCanceled", ({ senderId, receiverId }) => {
            if (receiverId === currentUserId.userId) {
                console.log("A friend request was canceled!");
            }
        });

        return () => {
            socket.off("receiveFriendRequest");
            socket.off("friendRequestCanceled");
        };
    }, [currentUserId]); */
    //handle real time chat notification
    useEffect(() => {
        socket.on("receive_message", ({message}) => {
            console.log("New message received:", message);
            setNewMessage(message); // Show notification badge
        });
        return () => {
            socket.off("receive_message");
        };
    }, []);
    const toggleDrawer = () => setOpen(!open);


    function toggleChat(user) {
        setSelectedUser(user);
        setIsChatOpen(true)
        // setNewMessage(false);
    }
    // Handle user selection
    const handleUserSelect = (_, value) => {
        if (value) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${value.id}`)
                .then(response => {
                    setSelectedUser(response.data) // Store selected user's data
                    navigate(`/:${value.id}`)
                })
                .catch(error => console.log(error));
        }
    };

   

    return (
        <Grid2>
            <ListItem>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" color="transparent">
                        <Grid2 container justifyContent={"space-between"} >
                            <Grid2 container gap={1}>
                                {/* facebook logo */}
                                <Grid2>
                                    <ListItem>
                                        <a href="#">  <img src="https://img.freepik.com/premium-vector/art-illustration_929495-41.jpg"
                                            alt="facebook logo" style={{ width: "45px", height: "45px" }} /></a>
                                    </ListItem>
                                </Grid2>
                                {/*  search friends field */}
                                <Grid2>
                                    <ListItem>

                                        <Autocomplete
                                            disablePortal
                                            options={autoData}
                                            getOptionLabel={(option) => option.label}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Search Facebook" />}
                                            onChange={handleUserSelect}
                                        />
                                        {/* Render FriendUser component when a user is selected */}
                                        {/*  {selectedUser && <FriendRequest userData={selectedUser} />} */}
                                    </ListItem>
                                </Grid2>
                            </Grid2>
                            {/*    Home icon */}
                            <Grid2 container gap={2} padding={1}>
                                <Grid2>
                                    <Link to={"/home"}><HomeIcon color="primary" sx={{ fontSize: 40 }} /></Link>
                                </Grid2>
                            </Grid2>

                            {/*  friends icon */}
                            <Grid2>
                                <ListItem>
                                    <Link to={"/friends"}><PeopleIcon color="primary" sx={{ fontSize: 40 }} selectedUser={selectedUser} /></Link>
                                </ListItem>
                            </Grid2>
                            {/*    messenger icon */}
                            <Grid2 container gap={2} padding={1}>
                                <Grid2>
                                    <Badge color="error" variant={newMessage ? "dot" : "standard"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                            onClick={toggleDrawer} width="40" height="40" viewBox="0 0 50 50">
                                            <path d="M 25 2 C 12.300781 2 2 11.601563 2 23.5 C 2 29.800781 4.898438 35.699219 10 39.800781 L 10 48.601563 L 18.601563 44.101563 C 20.699219 44.699219 22.800781 44.898438 25 44.898438 C 37.699219 44.898438 48 35.300781 48 23.398438 C 48 11.601563 37.699219 2 25 2 Z M 27.300781 30.601563 L 21.5 24.398438 L 10.699219 30.5 L 22.699219 17.800781 L 28.601563 23.699219 L 39.101563 17.800781 Z"></path>
                                        </svg>
                                    </Badge>
                                    <Drawer anchor="right" open={open} onClose={toggleDrawer}>
                                        <div style={{ width: 300, padding: 16 }}>
                                            <Typography variant="h6" sx={{ display: "flex", justifyContent: "space-between" }}>
                                                Chats
                                                <IconButton onClick={toggleDrawer}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </Typography>

                                            {/* Search Bar */}
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                placeholder="Search Messenger"
                                                onChange={(e) => setSearch(e.target.value)}
                                                sx={{ mb: 2 }}
                                            />

                                            {/* Friends List */}
                                            <List style={{ cursor: "pointer" }}>
                                            {/*     {friendData
                                                    .filter((friend) => friend.name.toLowerCase().includes(search.toLowerCase()))
                                                    .map((friend, index) => (
                                                        <ListItem component={"button"} key={index} onClick={() => toggleChat(friend)}>
                                                            <ListItemAvatar>
                                                                <Avatar src={friend.avatar} />
                                                            </ListItemAvatar>
                                                            <ListItemText primary={friend.name} secondary={friend.lastMessage} />
                                                        </ListItem>
                                                    ))} */}
                                                   {/*   <ListItem component={"button"} key={index} onClick={() => toggleChat({confirmUser})}>
                                                            <ListItemAvatar>
                                                                <Avatar src={confirmUser.avatar} />
                                                            </ListItemAvatar>
                                                            <ListItemText primary={confirmUser.username}  />
                                                        </ListItem>  */}
                                            </List>
                                        </div>
                                    </Drawer>
                                    {/* Render Chat Component When Chat is Open */}
                                    {isChatOpen && confirmUser && (
                                        <Chat currentUserId={currentUserId.userId} recipientId={confirmUser} onClose={() => setIsChatOpen(false)} />
                                    )}
                                    {/* <button onClick={toggleChat} style={{ float: "right", marginTop: "10px" }}>Close</button> */}
                                </Grid2>
                            </Grid2>
                            {/*    Notification icon */}
                            <Grid2>
                                <ListItem>
                                    <Badge
                                        color="error"
                                        variant={showNotification ? "dot" : "standard"}
                                        onClick={() => setShowNotification(false)}
                                    >
                                        <NotificationsIcon sx={{ fontSize: 40 }} color="primary" />
                                    </Badge>
                                    {showNotification && (
                                        <div style={{
                                            position: "absolute",
                                            background: "white",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                            top: "50px",
                                            right: "10px",
                                        }}>
                                            {notification}
                                        </div>
                                    )}
                                </ListItem>
                            </Grid2>
                            {/*     profile icon */}
                            <Grid2>
                                <Link to={"/profile"}><AccountCircleIcon sx={{ fontSize: 40 }} color="primary" /></Link>
                            </Grid2>
                        </Grid2>

                    </AppBar>
                </Box>
            </ListItem>
        </Grid2 >
    )
}

