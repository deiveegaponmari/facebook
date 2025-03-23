import React, { useState, useEffect } from "react";
import {
  Card, CardContent, CardHeader, Avatar, Typography, CardMedia, CardActions, IconButton, Button,
  TextField, Dialog, DialogContent, DialogTitle, Tooltip
} from "@mui/material";



import io from "socket.io-client";
import axios from "axios";

import PostCard from "./PostCard";

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, { transports: ["websocket"] });

const CardUpload = (props) => {
  const { staticData = false } = props;
  const [posts, setPosts] = useState([]);
 
  


  useEffect(() => {
    if (staticData) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/newsfeed/data`)
        .then((response) => setPosts(response.data))
        .catch((error) => {
          console.log(error)
        })
    } else {
      /*  axios.get(`${import.meta.env.VITE_BACKEND_URL}/post/getpost`)
         .then((response) => setPosts(response.data))
         .catch((error) => {
           console.log(error)
           alert("Failed to load stories")
         })
     } */
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/post/getpost`)
        .then((response) => {
          setPosts(response.data);
          // Fetch comments for each post
          response.data.forEach(post => {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/comment/${post._id}`)
              .then(res => {
                setComments(prev => ({
                  ...prev,
                  [post._id]: res.data.comments
                }));
              })
              .catch(err => console.error("Error loading comments:", err));
          });
        })
        .catch(error => {
          console.log(error);
          alert("Failed to load stories");
        });
    }
  }, [staticData]);

 
 
  /*   const handleCommentClick = async (postId) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/comment/${currentUserId}/${postId}`, { text: newComment });
    
        if (response.data.success) {
          setComments([...comments, response.data.comment]);
          setNewComment("");
          socket.emit("comment_post", { postId, comment: response.data.comment });
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
      
        
  }; */

  /*   useEffect(() => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/post/getpost`)
          .then((response) => setPosts(response.data))
          .catch((error) => {
            console.log(error)
            alert("Failed to load stories")
          })
      }, [staticData]) */



  // Submit comment and update comment list
  /*   const handleSendComment = (postId) => {
      if (!commentData[postId]) return; 
  
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), commentData[postId]] 
      }));
  
      setCommentData((prev) => ({
        ...prev,
        [postId]: "" // Clear input field
      }));
      const username = "New User";
      socket.emit("comment_post", { postId, username })
    }; */
  /*   const handleSendComment = async (postId) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/comment/${currentUserId}/${postId}`, { text: newComment });
    
        if (response.data.success) {
          setComments([...comments, response.data.comment]);
          setNewComment("");
          socket.emit("comment_post", { postId, comment: response.data.comment });
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }; */


  /*   if (!commentData[postId]) return;
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/comment//:userId/:postId`, {
        currentUserId,
        postId,
        comment: commentData[postId],
        username: "New User", 
      });
  
      if (response.status === 200) {
       
        socket.emit("comment_post", { postId, username: "New User" });
  
     
        setComments((prev) => ({
          ...prev,
          [postId]: [...(prev[postId] || []), response.data.comment],
        }));
  
      
        setCommentData((prev) => ({
          ...prev,
          [postId]: "",
        }));
      }
    } catch (error) {
      console.error("Error sending comment:", error);
    } */

  /* const handleLike = async (postId) => {
    console.log("postidddd-------------", postId);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/like/${currentUserId}/${postId}`, { method: "POST" });
      const data = await response.json();
      console.log("data----------", data)
      if (data.success) {
        const getCount=await fetch(`${import.meta.env.VITE_BACKEND_URL}/like/getcount/${currentUserId}/${postId}`, { method: "GET" });
        const countData=await getCount.json();
        setLikes((prevLikes) => (data.liked ? prevLikes + 1 : prevLikes - 1));
        socket.emit("like_post", { postId, userId: currentUserId });
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }; */
 



 
  //handle share button
  /*   const handleShare = (post) => {
      const shareUrl = `${window.location.origin}/post/${post.id}`;
      const shareText = `${post.content}\nCheck it out here: ${shareUrl}`;
  
      if (navigator.share) {
        navigator.share({
          title: post.username,
          text: shareText,
          url: shareUrl
        })
          .then(() => console.log("Post shared successfully"))
          .catch((error) => console.log("Error sharing", error));
      } else {
        // Fallback: Open share options manually
        const encodedText = encodeURIComponent(shareText);
        const encodedUrl = encodeURIComponent(shareUrl);
  
        const socialLinks = {
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
          whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`
        };
  
        // Open the share option in a new window/tab
        window.open(socialLinks.facebook, "_blank");
      }
    }; */
  // Handle share button click
 
  // Handle share to a specific social platform
  
  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      {posts.map((post, index) => (
        <PostCard post={post} index={index} />
      ))}
     
    </div>
  );
};

export default CardUpload;
