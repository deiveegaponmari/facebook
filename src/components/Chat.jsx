import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:4000");
export default function Chat(){
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // Listen for messages from server
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => socket.off("receive_message");
    }, []);

    // Send message to server
    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("send_message", message);
            setMessage(""); // Clear input field
        }
    };
    return(
        <div>
        <h2>Real-Time Chat</h2>
        <div>
            {messages.map((msg, index) => (
                <p key={index}>{msg}</p>
            ))}
        </div>
        <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
    </div>
    )
}