import React, { useState, useEffect, useRef } from "react";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import socket from "../middleware/socket";

export default function Chat({currentUserId, recipientId }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
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

        socket.emit("register", currentUserId);
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
    }, [currentUserId, recipientId]);

    const sendMessage = () => {
        if (!message.trim()) return;
        if (!currentUserId || !recipientId) {
            console.error(" Error: Missing currentUserId or recipientId");
            return;
        }

        console.log(" Sending Message:", {
            senderId: currentUserId,
            recipientId: recipientId,
            text: message.trim()
        });

        socket.emit("send_message", {
            senderId: currentUserId,
            recipientId: recipientId,
            text: message.trim()
        });

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
                    <Typography variant="h5" textAlign="center" gutterBottom>
                        Real-Time Chat
                    </Typography>

                    <Box
                        sx={{
                            height: "300px",
                            overflowY: "auto",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            padding: "10px",
                            backgroundColor: "#fafafa"
                        }}
                    >
                        {messages.map((msg, index) => (
                            <Typography
                                key={index}
                                variant="body1"
                                sx={{
                                    padding: "5px 0",
                                    textAlign: msg.senderId === currentUserId ? "right" : "left",
                                    color: msg.senderId === currentUserId ? "blue" : "black"
                                }}
                            >
                                {msg.text}
                            </Typography>
                        ))}
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
