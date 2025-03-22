import React, { useState, useEffect } from "react";
import {
  Card, CardContent, CardHeader, Avatar, Typography, CardMedia, CardActions, IconButton, Button,
  TextField, Dialog, DialogContent, DialogTitle
} from "@mui/material";
import { Favorite, Share, MoreVert, ChatBubbleOutline } from "@mui/icons-material";
import { Facebook, Twitter, WhatsApp, Close } from "@mui/icons-material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import io from "socket.io-client";
import axios from "axios";
import { useData } from "../context/data"

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, { transports: ["websocket"] });

const CardUpload = (props) => {
  const { staticData = false } = props;
  const [posts, setPosts] = useState([]);
  const [commentData, setCommentData] = useState({}); // Stores comment input for each post
  const [notification, setNotification] = useState("");
  const [sharePost, setSharePost] = useState(null); // Store the post to be shared
  const { decodedToken } = useData();
  const currentUserId = decodedToken.userId;
  console.log(currentUserId)
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [showInput, setShowInput] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [shareModal, setShareModal] = useState(null);


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
  // Toggle comment input visibility
  const handleCommentClick = (postId) => {
    setCommentData((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };
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

  // Update comment input value
  const handleInputChange = (postId, value) => {
    setCommentData((prev) => ({
      ...prev,
      [postId]: value
    }));
  };

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
  const handleSendComment = async (postId) => {
    if (!commentData[postId]) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/comment/${currentUserId}/${postId}`,
        { text: commentData[postId] }
      );

      if (response.data.success) {
        setComments((prev) => ({
          ...prev,
          [postId]: [...(prev[postId] || []), response.data.comment]
        }));
        setCommentData((prev) => ({
          ...prev,
          [postId]: ""
        }));
        socket.emit("comment_post", { postId, comment: response.data.comment });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

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

  const handleLike = async (postId) => {
    console.log("postidddd-------------", postId);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/like/${currentUserId}/${postId}`, { method: "POST" });
      const data = await response.json();
      console.log("data----------", data)
      if (data.success) {
        setLikes(prevLikes => data.message === "Like counted successfully" ? prevLikes + 1 : prevLikes - 1);
        socket.emit("like_post", { postId, userId: currentUserId });
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };


  useEffect(() => {
    socket.on("notification", (data) => {
      setNotification(data.message);
    });

    socket.on("new_comment", ({ postId, comment }) => {
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), comment]
      }));
    });
  

    return () => {
      socket.off("notification");
      socket.off("new_comment")
    };
  }, [setNotification]);
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
  const handleShareClick = (post) => {
    setSharePost(post); // Open the share modal
  };
  // Handle share to a specific social platform
  const handleShareToPlatform = (platform, post) => {
    const shareUrl = `${window.location.origin}/post/${post.id}`;
    const shareText = `${post.content}\nCheck it out here: ${shareUrl}`;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    const socialLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`
    };

    window.open(socialLinks[platform], "_blank");
  };
  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      {posts.map((post, index) => (
        <Card key={`${index}-${post.id}`} style={{ marginBottom: 20 }}>
          <CardHeader
            avatar={<Avatar src={post.avatar} />}
            action={<IconButton><MoreVert /></IconButton>}
            title={post.username}
            subheader={post.time}
          />
          <CardContent>
            <Typography>{post.content}</Typography>
          </CardContent>
          {post.type === "image" ? (
            <CardMedia component="img" height="300" image={post.media} alt="post media" />
          ) : (
            <CardMedia component="video" controls height="300" src={post.media} />
          )}
          <CardActions>
            <IconButton onClick={() => handleLike(post._id)}><ThumbUpOffAltIcon /></IconButton>
            <Typography>{likes} Likes</Typography>
            <IconButton onClick={() => handleCommentClick(post._id)}>
              <ChatBubbleOutline />
            </IconButton>
            <IconButton onClick={() => handleShareClick(post)} ><Share /></IconButton>
          </CardActions>

          {/* Comment Input Box - Show when clicking "Comment" */}
          {commentData.hasOwnProperty(post._id) && (
            <div style={{ padding: "10px 16px", display: "flex", alignItems: "center" }}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Write a comment..."
                value={commentData[post._id]}
                onChange={(e) => handleInputChange(post._id, e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: 10 }}
                onClick={() => handleSendComment(post._id)}
              >
                Send
              </Button>
            </div>
          )}

          {/* Render Comments */}
          {comments[post._id]?.length > 0 && (
            <div style={{ padding: "10px 16px" }}>
              <Typography variant="subtitle2">Comments:</Typography>
              {comments[post._id].map((comment, index) => (
                <Typography key={index} style={{ marginTop: 5 }}>
                  • {comment}
                </Typography>
              ))}
            </div>
          )}
        </Card>
      ))}
      {/* open social media icons from share button after click */}
      <div>
        <Dialog open={Boolean(sharePost)} onClose={() => setSharePost(null)}>
          <DialogTitle>
            Share Post
            <IconButton onClick={() => setSharePost(null)} style={{ float: "right" }}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "20px" }}>
            <IconButton onClick={() => handleShareToPlatform("facebook", sharePost)}>
              <Facebook color="primary" fontSize="large" />
            </IconButton>
            <IconButton onClick={() => handleShareToPlatform("twitter", sharePost)}>
              <Twitter color="primary" fontSize="large" />
            </IconButton>
            <IconButton onClick={() => handleShareToPlatform("whatsapp", sharePost)}>
              <WhatsApp color="primary" fontSize="large" />
            </IconButton>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CardUpload;
