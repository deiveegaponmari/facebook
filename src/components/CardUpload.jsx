import React, { useState } from "react";
import { Card, CardContent, CardHeader, Avatar, Typography, CardMedia, CardActions, IconButton, Button, TextField } from "@mui/material";
import { Favorite, Share, MoreVert, ChatBubbleOutline } from "@mui/icons-material";

const postsData = [
  {
    id: 1,
    username: "vanitha",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "2h ago",
    content: "Enjoying a great day at the beach!",
    media: "https://i.pinimg.com/736x/f1/5d/ea/f15deaa797aaa5901d514fde36a51ea9.jpg",
    type: "image"
  }, {
    id: 6,
    username: "Taylor Swift",
    avatar: "https://i.pravatar.cc/150?img=6",
    time: "6d ago",
    content: "Here’s a sneak peek of my new music video! 🎶",
    media: "https://videos.pexels.com/video-files/3971351/3971351-sd_640_360_25fps.mp4",
    type: "video"}
];

const NewsFeed = () => {
  const [posts, setPosts] = useState(postsData);
  const [commentData, setCommentData] = useState({}); // Stores comment input for each post
  const [comments, setComments] = useState({}); // Stores list of comments for each post

  // Toggle comment input visibility
  const handleCommentClick = (postId) => {
    setCommentData((prev) => ({
      ...prev,
      [postId]: prev[postId] ? "" : "" // Show/hide input field
    }));
  };

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
            <IconButton><Favorite /></IconButton>
            <IconButton onClick={() => handleCommentClick(post.id)}>
              <ChatBubbleOutline />
            </IconButton>
            <IconButton><Share /></IconButton>
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
    </div>
  );
};

export default NewsFeed;
