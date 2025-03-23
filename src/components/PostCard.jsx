import React, { useState, useEffect } from "react";
import {
    Card, CardContent, CardHeader, Avatar, Typography, CardMedia, CardActions, IconButton, Button,
    TextField, Dialog, DialogContent, DialogTitle, Tooltip, DialogActions
} from "@mui/material";
import { Favorite, Share, MoreVert, ChatBubbleOutline } from "@mui/icons-material";
import { Facebook, Twitter, WhatsApp, Close } from "@mui/icons-material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useData } from "../context/data";
import axios from "axios";
import io from "socket.io-client";
const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, { transports: ["websocket"] });

export default function PostCard({ post, index }) {
    const [commentData, setCommentData] = useState({}); // Stores comment input for each post
    const [notification, setNotification] = useState("");
    const [sharePost, setSharePost] = useState(null); // Store the post to be shared
    const [likes, setLikes] = useState(0);
    const [showInput, setShowInput] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [shareModal, setShareModal] = useState(null);
    const [likeName, setLikeName] = useState("");
    const [openModal, setOpenModal] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const { decodedToken } = useData();
    const currentUserId = decodedToken.userId;
    console.log(currentUserId)
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/like/${currentUserId}`)
            .then((response) => {
                console.log("like names ", response)
                setLikeName(response.data.username)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    // Toggle comment input visibility
    /*  const handleCommentClick = (postId) => {
         setCommentData((prev) => ({
             ...prev,
             [postId]: !prev[postId]
         }));
     }; */
    // Update comment input value
    /*  const handleInputChange = (postId, value) => {
         setCommentData((prev) => ({
             ...prev,
             [postId]: value
         }));
     }; */

    const handleLike = async (postId) => {
        console.log("postidddd-------------", postId);
        try {
            // Send POST request to like/unlike
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/like/${currentUserId}/${postId}`, { method: "POST" });
            const data = await response.json();
            console.log("data----------", data);

            if (data.success) {
                // Fetch the updated like count from backend
                const getCount = await fetch(`${import.meta.env.VITE_BACKEND_URL}/like/getcount/${postId}`, { method: "GET" });
                const countData = await getCount.json();

                console.log("countdata-----", countData.countList)
                // Update like count directly from the backend response
                setLikes(countData.countList.length);

                // Emit socket event for real-time update
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

       /*  socket.on("new_comment", ({ postId, comment }) => {
            setComments((prev) => ({
                ...prev,
                [postId]: [...(prev[postId] || []), comment]
            }));
        }); */

        socket.on("receive_comment", ({ postId, comment }) => {
            setComments((prev) => ({
                ...prev,
                [postId]: [...(prev[postId] || []), comment]
            }));
        });


        return () => {
            socket.off("notification");
            socket.off("receive_comment")
        };
    }, [setNotification]);
    const handleShareClick = (post) => {
        setSharePost(post); // Open the share modal
    };
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
    // Toggle comment input visibility
    const handleCommentClick = (postId) => {
        
            setOpenModal(postId);
        

        /*  setCommentData((prev) => ({
           ...prev,
           [postId]: !prev[postId]
         })); */
    };
    // Close modal
    const handleClose = () => {
        setOpenModal(null);
    };
    // Handle comment input change
    const handleInputChange = (e) => {
        setCommentText(e.target.value);
    };
    const handleSendComment = async (postId) => {
        console.log(commentData)
        // if (!commentData[postId]) return;
        console.log("postid--------",postId)

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/comment/${currentUserId}/${postId}`,
                /* { text: commentData[postId] } */ {text:commentText}
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
    const fetchComments = async (postId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/comment/${postId}`);
            if (response.data.success) {
                console.log('response.data :0-- ', response.data);
                setComments((prev) => ({
                    ...prev,
                    [postId]: response.data.comments
                }));
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

// new comment is added
    useEffect(() => {
        // posts.forEach(post => {
            fetchComments(post.id);
        // });
    }, []);


    /*   const handleSendComment = async (postId) => {
          if (!commentData[postId]) return;
          console.log("comment user text", commentText)
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
      }; */
    return (

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
                <Typography>{likes} </Typography>
                {/* <Typography variant="standard" >Likes</Typography> */}
                {console.log(likeName)}
                <Tooltip title={likeName} arrow>
                    <Typography
                        variant="body1"
                        sx={{
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline", cursor: "pointer" },
                        }}
                    >
                        Likes
                    </Typography>
                </Tooltip>
                <IconButton onClick={() => handleCommentClick(post._id)}>
                    <ChatBubbleOutline />
                </IconButton>
                {/* Comment Modal */}
                <Dialog open={openModal === post._id} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Add a Comment</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            placeholder="Write a comment..."
                            value={commentText}
                            /* onChange={handleInputChange} */
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={() => handleSendComment(post._id)} color="primary" variant="contained">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
                <IconButton onClick={() => handleShareClick(post)} ><Share /></IconButton>
            </CardActions>

            {/* Comment Input Box - Show when clicking "Comment" */}
            {/* {commentData.hasOwnProperty(post._id) && (
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
            )} */}

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
        </Card>

    )
}