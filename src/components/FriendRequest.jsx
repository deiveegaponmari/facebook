import { Grid2, ListItem, Avatar, Stack, Typography, Button } from "@mui/material";
import { useState} from "react";
import { io } from "socket.io-client";


const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, { transports: ["websocket"] });

export default function FriendRequest({ selectedUser, currentUserId}) {
    console.log("selected user 2: ", selectedUser)
    const [modelOpen, setModalOpen] = useState(false)
    console.log("currentuserId is ", currentUserId.userId)
    const [requestSent, setRequestSent] = useState(false);
    if (!selectedUser) {
        return <Typography variant="h6">No user found</Typography>;
    }
    

    // Send Friend Request
    function handleFriendReq() {
        socket.emit("sendFriendRequest", {
            senderId: currentUserId.userId,
            receiverId: selectedUser._id,
        });

        socket.emit("notification", {
            receiverId: selectedUser._id,
            message: `${currentUserId.userId} sent you a friend request!`,
        });
        setRequestSent(true);
    }

    // Cancel Friend Request
    function handleFriendCancel() {
        socket.emit("cancelFriendRequest", {
            senderId: currentUserId.userId,
            receiverId: selectedUser._id,
        });
        setRequestSent(false);
    }
    return (
        <Grid2 container width={"80%"} height={"50%"} display={"flex"} direction={"row"}>
            <Grid2 key={selectedUser['_id']} container direction={"row"} >
                <Grid2>
                    <ListItem>
                        <Stack spacing={2}>
                            <Avatar alt={selectedUser.username} src={selectedUser.avatar} />
                        </Stack>
                    </ListItem>
                </Grid2>
                <Grid2 container display={"flex"} direction={"column"}>
                    <Grid2>
                        <ListItem>
                            <Typography variant="h6">{selectedUser.username}</Typography>
                        </ListItem>
                    </Grid2>
                </Grid2>
                <Grid2>
                    <ListItem>
                        {requestSent
                         ?  <Button variant="contained" onClick={handleFriendCancel}>Cancel Request</Button>
                       : <Button variant="contained" onClick={handleFriendReq}>Add Friend</Button>
                        }
                    </ListItem>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}