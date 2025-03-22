import {
    Grid2, ListItem, TextField, Autocomplete, Drawer, IconButton, Typography, List, ListItemAvatar, Avatar,
    ListItemText, Badge, Snackbar, Alert
} from "@mui/material";
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
    const [chatUser, setChatUser] = useState([]);
    // const [friendReqUser, setfriendReqUser] = useState([])
    console.log(currentUserId);


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

    useEffect(() => {
        let intervalId;
        intervalId = setInterval(() => {

            socket.emit("registerUser", currentUserId?.userId);
         
            socket.on("receiveFriendRequest", ({ senderId, receiverId }) => {
                console.log("llll senderId:-- ", senderId);
                console.log("llll receiverId:-- ", receiverId);
                console.log("llll currentUserId.userId:-- ", currentUserId.userId);
                if (receiverId === currentUserId.userId) {
                    setfriendReqUser(senderId);
                    console.log("You received a friend request!");
                }
            });

            socket.on("notification", ({ message, receiverId }) => {
                console.log('message :------ message :-- ', message)
             
                console.log("message :-- ", message);
                console.log("receiverId :-- ", receiverId);
                
                if (receiverId == currentUserId.userId) {
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
        }, 3000);


        return () => clearInterval(intervalId);
    }, [])

    //handle socket
    useEffect(() => {
        socket.emit("registerUser", currentUserId?.userId);

        socket.on("receiveFriendRequest", ({ senderId, receiverId }) => {
            if (receiverId === currentUserId?.userId) {
                console.log("You received a friend request!");
                setNotification("You have a new friend request!");
                setShowNotification(true);
            }
        });

        socket.on("notification", ({ message, receiverId }) => {
            if (receiverId === currentUserId?.userId) {
                setNotification(message || "New Notification!");
                setShowNotification(true)
            }
        });

        socket.on("friendRequestCanceled", ({ senderId, receiverId }) => {
            if (receiverId === currentUserId?.userId) {
                console.log("A friend request was canceled!");
            }
        });

        socket.on("receive_message", ({ message }) => {
            console.log("New message received:", message);
            setNewMessage(true);  // Only showing new message notification
        });
        //handle like post
        socket.on("notification", (data) => {
            console.log("Notification received:", data);
            setNotification((prev) => [...prev, data.message]); // Append new notification
            setShowNotification(true)
        });
        return () => {
            socket.off("receiveFriendRequest");
            socket.off("notification");
            socket.off("friendRequestCanceled");
            socket.off("receive_message");
        };
    }, [currentUserId]);

    const toggleDrawer = () => setOpen(!open);

    function toggleChat(user) {
        console.log("chatuser", user);
        // Check if user object exists and contains senderId & receiverId
        if (!user || !user._id) {
            console.error("Invalid user object passed to toggleChat:", user);
            return;
        }
        const recipientId = user._id;
        console.log("Recipient ID:", recipientId);
        if (chatUser?._id === recipientId) {
            setIsChatOpen(false); // Close chat
        } else {
            setChatUser(user);
            setIsChatOpen(true);
            setNewMessage(false); // Clear new message notification
        }
    }

    //console.log("chatuser", chatUser.receiverId)
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

    useEffect(() => {
        if (!currentUserId?.userId) return;

        const fetchFriends = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/friendrequest/accepted/${currentUserId.userId}`);
                if (response.data.length > 0) {
                    console.log("Fetched Friends:", response.data);
                    setFriendData(response.data);
                } else {
                    console.warn("No accepted friends found.");
                }
            } catch (error) {
                console.error("Error fetching accepted friends:", error);
            }
        };

        fetchFriends();
    }, [currentUserId]);
      

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
                                                {Array.from(new Map(friendData.map(friend => {
                                                    
                                                    const friendInfo = friend.receiverId._id === currentUserId.userId ? friend.senderId : friend.receiverId;
                                                    console.log("kkkkkkk friend:-- ", friend)
                                                    console.log("kkkkkkk friendInfo:-- ", friendInfo)
                                                    return [friendInfo._id, friendInfo, ]; 
                                                })).values()).map((friend, index) => (
                                                   
                                                    <ListItem key={index} button onClick={() => toggleChat(friend)}>
                                                        <ListItemAvatar>
                                                            <Avatar src={friend.avatar} />
                                                        </ListItemAvatar>
                                                        <ListItemText primary={friend.username} />
                                                    </ListItem>
                                                ))}
                                                {/* {friendData.map((friend, index) => (
                                                   
                                                    <ListItem key={index} button onClick={() => toggleChat(friend)}>
                                                        <ListItemAvatar>
                                                            <Avatar src={friend.senderId.avatar} />
                                                        </ListItemAvatar>
                                                        <ListItemText primary={friend.senderId.username} />
                                                    </ListItem>
                                                ))} */}
                                            </List>
                                        </div>
                                    </Drawer>
                                    {/* Render Chat Component When Chat is Open */}

                                    {isChatOpen && chatUser && (
                                        <Chat
                                            currentUserId={currentUserId.userId}
                                            recipientId={chatUser._id}
                                            onClose={() => setIsChatOpen(false)}
                                        />
                                    )}
                                </Grid2>
                            </Grid2>
                            {/*    Notification icon */}
                            <Grid2>
                                <ListItem>
                                    <Grid2>
                                        <ListItem>
                                            <Badge
                                                color="error"
                                                variant={showNotification ? "dot" : "standard"}
                                                onClick={() => setShowNotification(!showNotification)}
                                            >
                                                <NotificationsIcon sx={{ fontSize: 40 }} color="primary" />
                                            </Badge>

                                            {/* Snackbar for displaying notifications */}
                                            <Snackbar
                                                open={showNotification}
                                                autoHideDuration={3000}
                                                onClose={(event, reason) => {
                                                    if (reason !== "clickaway") {
                                                        setShowNotification(false);
                                                    }
                                                }}
                                            >
                                                <Alert severity="info" onClose={() => setShowNotification(false)}>
                                                    {notification || "New Notification!"}
                                                </Alert>
                                            </Snackbar>
                                        </ListItem>
                                    </Grid2>
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

