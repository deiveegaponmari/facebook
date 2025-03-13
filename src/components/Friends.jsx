import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useData } from '../context/data';
import axios from 'axios';
import socket from "../middleware/socket";

export default function Friends({ friendReqUser, selectedUser, setconfirmUser }) {
  console.log('llll friendReqUser :p--- ', friendReqUser)
  //console.log("selected user",selectedUser)
  const { decodedToken } = useData();
  const currentUserId = decodedToken;
  //console.log(currentUserId)
  const [currentId, setCurrentId] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  console.log("friendrequestdata", friendRequest)
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${currentUserId.userId}/`)
      .then((response) => {
        setCurrentId(response.data)
      })
  }, [currentUserId])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${friendReqUser}/`)
      .then((response) => {
        setFriendRequest(response.data)
      })
  }, [friendReqUser])

  // need to call 2sec
  useEffect(() => {
    socket.on("receiveFriendRequest", ({ senderId, receiverId }) => {
      if (receiverId === currentId._id) {
        console.log("You received a friend request from:", senderId);
      }
    });

    return () => {
      socket.off("receiveFriendRequest");
    };
  }, [currentId]);

  function handleConfirm() {
    console.log("Confirm clicked");
    // Use correct variables for senderId and receiverId
    const senderId = friendRequest._id; // The user who sent the request
    const receiverId = currentId._id; // The logged-in user
    console.log("senderid", senderId)
    console.log("receiverid", receiverId)
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/friendrequest/confirm/${senderId}/${receiverId}`)
      .then((response) => {
        console.log("Friend request confirmed:", response.data);
        setconfirmUser(response.data);
      })
      .catch((error) => console.log("Error confirming friend request:", error));
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Typography gutterBottom variant="h5" component="div">
        Friend Requests
      </Typography>

      <CardMedia
        sx={{ height: 140 }}
        image={friendRequest.avatar}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {friendRequest.username}
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth onClick={handleConfirm}>Confirm</Button>
        <Button fullWidth>Delete</Button>
      </CardActions>
    </Card>
  );
}