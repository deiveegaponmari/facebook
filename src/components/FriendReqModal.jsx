import React, { useEffect } from "react";
import { Modal, Box, Typography, Grid2, ListItem, Button,Alert } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import io from "socket.io-client";

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, { transports: ["websocket"] });
export default function FriendReqModal({ open, handleClose }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [showFriendNotify,setshowFriendNotify]=useState("");
   /*  function handlePost() {
        console.log("post clicked")
    } */

    //handile notification send to if the user accept or reject
    useEffect(() => {
        const handleNotification = (data) => {
            setSnackbarMessage(data.message);
            setSnackbarOpen(true);
        };
    
        socket.on("notification", handleNotification);
    
        return () => {
            socket.off("notification", handleNotification);
        };
    }, []);
    
    
   /*  useEffect(()=>{
        
        socket.on("notification", (data) => {
            setshowFriendNotify(data.message); 
            socket.on("notification", (data) => {
                setSnackbarMessage(data.message);
                setSnackbarOpen(true);
            
          });
      
          return () => {
            socket.off("notification");
          };
    },[]) */
    // Function to handle Accept/Reject button clicks
    const handleAction = (action) => {
        setSnackbarMessage(`Friend Request ${action}ed`);
        setSnackbarOpen(true);
       // const username = "CurrentUser"; 
      /*   socket.emit("notification", { action, username }); */
      socket.emit("friend_request", { senderId: "User1", recipientId: "User2", action });

    };

    // Function to close Snackbar
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    {/*  create post text and icon created */}
                    <Grid2 container justifyContent={"center"} >
                        <Grid2>
                            <ListItem>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Friend Request
                                </Typography>
                            </ListItem>
                        </Grid2>
                        {/* clear icon added */}
                        <Grid2 container direction={"row"}>
                            <Grid2>
                                <ListItem>
                                    <Button variant="standard" onClick={() => handleAction("Accept")}>Accept</Button>
                                </ListItem>
                            </Grid2>
                            <Grid2>
                                <ListItem>
                                    <Button variant="standard" onClick={() => handleAction("Reject")}>Reject</Button>
                                </ListItem>
                            </Grid2>
                        </Grid2>
                    </Grid2>

                </Box>
            </Modal>
            {/* Snackbar Alert */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarMessage.includes("Accepted") ? "success" : "error"}
                    variant="filled"
                    action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    )
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};