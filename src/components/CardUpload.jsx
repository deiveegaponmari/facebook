import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Avatar, Typography, CardMedia, CardActions, IconButton, Button, 
  TextField,Dialog,DialogContent,DialogTitle } from "@mui/material";
import { Favorite, Share, MoreVert, ChatBubbleOutline } from "@mui/icons-material";
import { Facebook, Twitter, WhatsApp ,Close} from "@mui/icons-material";

import io from "socket.io-client";
import axios from "axios";

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, { transports: ["websocket"] });

/* const postsData = [
  {
    id: 1,
    username: "vanitha",
    avatar: "https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJhbHxlbnwwfHwwfHx8MA%3D%3D",
    time: "2h ago",
    content: "Enjoying a great day at the beach!",
    media: "https://i.pinimg.com/736x/f1/5d/ea/f15deaa797aaa5901d514fde36a51ea9.jpg",
    type: "image"
  },
  {
    id: 2,
    username: "Taylor Swift",
    avatar: "https://images.unsplash.com/photo-1516475429286-465d815a0df7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyYWx8ZW58MHx8MHx8fDA%3D",
    time: "6d ago",
    content: "Here’s a sneak peek of my new music video! 🎶",
    media: "https://videos.pexels.com/video-files/3971351/3971351-sd_640_360_25fps.mp4",
    type: "video"
  },
  {
    id: 3,
    username: "Taylor Swift",
    avatar: "https://plus.unsplash.com/premium_photo-1675127367513-7f4388aa9076?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJhbHxlbnwwfHwwfHx8MA%3D%3D",
    time: "6d ago",
    content: "Here’s a sneak peek of my new music video! 🎶",
    media: "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW90aXZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    type: "image"
  },
  {
    id: 4,
    username: "Taylor Swift",
    avatar: "https://i.pravatar.cc/150?img=6",
    time: "6d ago",
    content: "Here’s a sneak peek of my new music video! 🎶",
    media: "https://plus.unsplash.com/premium_photo-1687067885966-d755107af021?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW90aXZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    type: "image"
  },
  {
    id: 5,
    username: "Taylor Swift",
    avatar: "https://i.pravatar.cc/150?img=6",
    time: "6d ago",
    content: "Here’s a sneak peek of my new music video! 🎶",
    media: "https://videos.pexels.com/video-files/4763786/4763786-sd_960_506_24fps.mp4",
    type: "video"
  },
  {
    id: 6,
    username: "Taylor Swift",
    avatar: "https://i.pravatar.cc/150?img=6",
    time: "6d ago",
    content: "Here’s a sneak peek of my new music video! 🎶",
    media: "https://images.unsplash.com/photo-1494178270175-e96de2971df9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW90aXZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    type: "image"
  }, {
    id: 7,
    username: "Taylor Swift",
    avatar: "https://i.pravatar.cc/150?img=6",
    time: "6d ago",
    content: "Here’s a sneak peek of my new music video! 🎶",
    media: "https://videos.pexels.com/video-files/3971351/3971351-sd_640_360_25fps.mp4",
    type: "video"
  },
  {
    id: 8,
    username: "Taylor Swift",
    avatar: "https://i.pravatar.cc/150?img=6",
    time: "6d ago",
    content: "Here’s a sneak peek of my new music video! 🎶",
    media: "https://videos.pexels.com/video-files/4763871/4763871-sd_960_506_24fps.mp4",
    type: "video"
  },
  {
    id: 9,
    username: "Taylor Swift",
    avatar: "https://i.pravatar.cc/150?img=6",
    time: "6d ago",
    content: "Here’s a sneak peek of my new music video! 🎶",
    media: "https://videos.pexels.com/video-files/3971351/3971351-sd_640_360_25fps.mp4",
    type: "video"
  },
  {
    id: 10,
    username: "Taylor Swift",
    avatar: "https://i.pravatar.cc/150?img=6",
    time: "6d ago",
    content: "Here’s a sneak peek of my new music video! 🎶",
    media: "https://videos.pexels.com/video-files/4763474/4763474-sd_640_360_24fps.mp4",
    type: "video"
  }
]; */
const NewsFeed = (props) => {
  const { setUploadFiles, uploadFiles, staticData = false } = props;
  const [posts, setPosts] = useState([]);
  const [commentData, setCommentData] = useState({}); // Stores comment input for each post
  const [comments, setComments] = useState({}); // Stores list of comments for each post
  const [notification, setNotification] = useState("");
   const [sharePost, setSharePost] = useState(null); // Store the post to be shared

  useEffect(() => {
    axios.get("http://localhost:5173/post.json")
      .then((response) => setPosts(response.data))
      .catch((error) => {
        console.log(error)
      })
  }, [])
  // Toggle comment input visibility
  const handleCommentClick = (postId) => {
    setCommentData((prev) => ({
      ...prev,
      [postId]: prev[postId] ? "" : "" // Show/hide input field
    }));
  };

  useEffect(() => {
    if (staticData) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/post/getpost`)
        .then((response) => {
          console.log('kkkkkkkkkk response.data:-- ', response.data);
          let fullList = [];
          for (let i in response.data) {
            let singleObj = response.data[i];
            console.log('kkkkkk i:-- ', singleObj);
            fullList.push({
              id: i,
              username: "Taylor Swift",
              avatar: "https://i.pravatar.cc/150?img=6",
              time: "6d ago",
              content: "Here’s a sneak peek of my new music video! 🎶",
              media: singleObj?.src,
              type: singleObj?.type
            });
          }
          setPosts(fullList);
        })
        /* setStoryData(response.data)) */
        .catch((error) => {
          console.log(error)
          alert("Failed to load stories")
        })
    }
  }, [staticData])

  // Update comment input value
  const handleInputChange = (postId, value) => {
    setCommentData((prev) => ({
      ...prev,
      [postId]: value
    }));
  };

  // Submit comment and update comment list
  const handleSendComment = (postId) => {
    if (!commentData[postId]) return; // Prevent empty comments

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), commentData[postId]] // Append new comment
    }));

    setCommentData((prev) => ({
      ...prev,
      [postId]: "" // Clear input field
    }));
    const username = "New User";
    socket.emit("comment_post", { postId, username })
  };
  //handle like button
  const handlelike = (postId) => {
    const username = "CurrentUser"; // Replace with logged-in user's name
    socket.emit("like_post", { postId, username }); // Send like event
  };

  useEffect(() => {
    socket.on("notification", (data) => {
      setNotification(data.message);
    });

    return () => {
      socket.off("notification");
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
      {posts.map((post) => (
        <Card key={post.id} style={{ marginBottom: 20 }}>
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
            <IconButton onClick={() => handlelike(post.id)}><Favorite /></IconButton>
            <IconButton onClick={() => handleCommentClick(post.id)}>
              <ChatBubbleOutline />
            </IconButton>
            <IconButton onClick={() =>  handleShareClick(post)} ><Share /></IconButton>
          </CardActions>

          {/* Comment Input Box - Show when clicking "Comment" */}
          {commentData.hasOwnProperty(post.id) && (
            <div style={{ padding: "10px 16px", display: "flex", alignItems: "center" }}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Write a comment..."
                value={commentData[post.id]}
                onChange={(e) => handleInputChange(post.id, e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: 10 }}
                onClick={() => handleSendComment(post.id)}
              >
                Send
              </Button>
            </div>
          )}

          {/* Render Comments */}
          {comments[post.id]?.length > 0 && (
            <div style={{ padding: "10px 16px" }}>
              <Typography variant="subtitle2">Comments:</Typography>
              {comments[post.id].map((comment, index) => (
                <Typography key={index} style={{ marginTop: 5 }}>
                  • {comment}
                </Typography>
              ))}
            </div>
          )}
        </Card>
      ))}

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

export default NewsFeed;
