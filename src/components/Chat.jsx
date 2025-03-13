import React, { useState, useEffect, useRef } from "react";
import { Grid2, Box, Card, CardContent, Typography, TextField, Button, ListItem } from "@mui/material";
import socket from "../middleware/socket";
import CloseIcon from '@mui/icons-material/Close';
export default function Chat({ currentUserId, recipientId, onClose }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    console.log("currentuserid", currentUserId);
    console.log("recipientid", recipientId)
    //console.log(message)
    /*   useEffect(() => {
          if (!currentUserId) return;
  
          socket.emit("register", currentUserId);
  
          socket.on("previous_messages").on("previous_messages", (prevMessages) => {
              setMessages(prevMessages);
          });
  
          socket.on("receive_message").on("receive_message", (data) => {
              setMessages((prev) => [...prev, data]);
          });
  
          socket.on("new_message_notification").on("new_message_notification", ({ senderId, message }) => {
              alert(`New message from ${senderId}: ${message}`);
          });
  
          return () => {
              socket.off("previous_messages");
              socket.off("receive_message");
              socket.off("new_message_notification");
          };
      }, [currentUserId]); */
    useEffect(() => {
        if (!currentUserId) return;

        socket.emit("registerUser", currentUserId);
        socket.emit("load_messages", { senderId: currentUserId, recipientId });

        const handlePreviousMessages = (prevMessages) => {
            setMessages(prevMessages);
        };

        const handleReceiveMessage = (data) => {
            console.log("receive message", data)
            setMessages((prev) => {

                if (!prev.some(msg => msg.text === data.text && msg.senderId === data.senderId)) {
                    return [...prev, data];
                }
                return prev;
            });
        };

        const handleNewMessageNotification = ({ senderId, message }) => {
            alert(`New message from ${senderId}: ${message}`);

        };

        socket.on("previous_messages", handlePreviousMessages);
        socket.on("receive_message", handleReceiveMessage);
        socket.on("new_message_notification", handleNewMessageNotification);

        return () => {
            socket.off("previous_messages", handlePreviousMessages);
            socket.off("receive_message", handleReceiveMessage);
            socket.off("new_message_notification", handleNewMessageNotification);
        };
    }, [currentUserId, recipientId]);

    /*     useEffect(() => {
          if (!currentUserId) return;
  
          socket.emit("registerUser", currentUserId);
          socket.emit("load_messages", { senderId: currentUserId, recipientId });
  
          socket.on("previous_messages", (prevMessages) => {
              setMessages(prevMessages);
          });
  
          socket.on("receive_message", (data) => {
              setMessages((prev) => [...prev, data]);
          });
  
          socket.on("new_message_notification", ({ senderId, message }) => {
              alert(`New message from ${senderId}: ${message}`);
          });
  
          return () => {
              socket.off("previous_messages");
              socket.off("receive_message");
              socket.off("new_message_notification");
          };
      }, [currentUserId, recipientId]); */
    const sendMessage = () => {
        if (!message.trim()) return;

        const newMsg = {
            senderId: currentUserId,
            recipientId,
            text: message.trim(),
            createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMsg]);
        socket.emit("send_message", newMsg);

        setMessage("");
    };

    useEffect(() => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "60vh",
                padding: 2,
                backgroundColor: "#f4f6f8"
            }}
        >
            <Card sx={{ width: "400px", maxWidth: "100%", boxShadow: 3 }}>
                <CardContent>
                    <Grid2 container>
                        <Grid2>
                            <ListItem>
                                <Typography variant="h5" textAlign="center" gutterBottom>
                                    Real-Time Chat
                                </Typography>
                            </ListItem>
                        </Grid2>
                        <Grid2>
                            <ListItem><CloseIcon onClick={onClose} /></ListItem>
                        </Grid2>

                    </Grid2>
                    <Box
                        sx={{
                            height: "300px",
                            overflowY: "auto",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            padding: "10px",
                            backgroundColor: "#fafafa",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {messages.map((msg, index) => {
                            const isSender = msg.senderId === currentUserId;
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        justifyContent: isSender ? "flex-end" : "flex-start",
                                        marginBottom: "5px",
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            padding: "8px 12px",
                                            borderRadius: "10px",
                                            maxWidth: "70%",
                                            wordWrap: "break-word",
                                            backgroundColor: isSender ? "#007BFF" : "#333",
                                            color: "white",
                                            textAlign: isSender ? "right" : "left",
                                        }}
                                    >
                                        {msg.text}
                                    </Typography>
                                </Box>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </Box>


                    <Box sx={{ display: "flex", marginTop: 1 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={sendMessage}
                            sx={{ marginLeft: 1 }}
                        >
                            Send
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
