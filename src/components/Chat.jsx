import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";

// Initialize socket connection
const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, { transports: ["websocket"] });

export default function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null); // For auto-scroll

    // Listen for messages from server
    useEffect(() => {
        socket.on("previous_messages", (prevMessages) => {
            setMessages(prevMessages); // Load messages from MongoDB
        });
        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("previous_messages");
            socket.off("receive_message");
        }
    }, []);

    // Send message to server
    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("send_message", message);
            setMessage(""); // Clear input field
        }
    };

    // Scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "50vh",
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
                            <Typography key={index} variant="body1" sx={{ padding: "5px 0" }}>
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
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Send on Enter
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
