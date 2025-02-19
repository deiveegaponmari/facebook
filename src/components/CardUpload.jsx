import React from "react";
import { Card, CardContent, CardHeader, Avatar, Typography, CardMedia, CardActions, IconButton, Button } from "@mui/material";
import { Favorite, Share, MoreVert, ChatBubbleOutline } from "@mui/icons-material";

const posts = [
  {
    id: 1,
    username: "vanitha",
    avatar: "data:image/jpeg;base64,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",
    time: "2h ago",
    content: "Enjoying a great day at the beach!",
    media: "https://i.pinimg.com/736x/f1/5d/ea/f15deaa797aaa5901d514fde36a51ea9.jpg",
    type: "image"
  },
  {
    id: 2,
    username: "Emma Watson",
    avatar: "https://i.pravatar.cc/150?img=2",
    time: "5h ago",
    content: "Delicious homemade pasta for dinner! 🍝",
    media: "https://source.unsplash.com/600x400/?pasta",
    type: "image"
  },
  {
    id: 3,
    username: "Michael Scott",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "1d ago",
    content: "Check out this funny moment from the office! 😂",
    media: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    type: "video"
  },
  {
    id: 4,
    username: "Sarah Connor",
    avatar: "https://img.freepik.com/free-vector/pink-rose-with-green-leaves_1308-11567.jpg?ga=GA1.1.688042556.1704957884&semt=ais_hybrid",
    time: "3d ago",
    content: "Just finished an intense workout session! 💪",
    media: "https://source.unsplash.com/600x400/?gym",
    type: "image"
  },
  {
    id: 5,
    username: "David Beckham",
    avatar: "https://i.pravatar.cc/150?img=5",
    time: "4d ago",
    content: "Football is life! ⚽",
    media: "https://source.unsplash.com/600x400/?football",
    type: "image"
  },
  {
    id: 6,
    username: "Taylor Swift",
    avatar: "https://i.pravatar.cc/150?img=6",
    time: "6d ago",
    content: "Here’s a sneak peek of my new music video! 🎶",
    media: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    type: "video"
  },
  {
    id: 7,
    username: "Elon Musk",
    avatar: "https://i.pravatar.cc/150?img=7",
    time: "1w ago",
    content: "Mars mission updates coming soon! 🚀",
    media: "https://source.unsplash.com/600x400/?space",
    type: "image"
  },
  {
    id: 8,
    username: "Steve Jobs",
    avatar: "https://img.freepik.com/premium-photo/beautiful-bright-pink-rose-flower-isolated-white-background-studio-lights_969690-86.jpg?ga=GA1.1.688042556.1704957884&semt=ais_hybrid",
    time: "2w ago",
    content: "Stay hungry, stay foolish.",
    media: "https://source.unsplash.com/600x400/?apple",
    type: "image"
  },
  {
    id: 9,
    username: "Bill Gates",
    avatar: "https://i.pravatar.cc/150?img=9",
    time: "3w ago",
    content: "Technology is best when it brings people together.",
    media: "https://source.unsplash.com/600x400/?technology",
    type: "image"
  },
  {
    id: 10,
    username: "Mark Zuckerberg",
    avatar: "https://img.freepik.com/free-vector/blooming-flower_1308-82989.jpg?ga=GA1.1.688042556.1704957884&semt=ais_hybrid",
    time: "1m ago",
    content: "Building the future of social networking!",
    media: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    type: "video"
  }
];

const NewsFeed = () => {
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
            <IconButton><ChatBubbleOutline /></IconButton>
            <IconButton><Share /></IconButton>
          </CardActions>
          <div style={{ padding: "10px 16px" }}>
            <Button variant="contained" color="primary" style={{ marginRight: 10 }}>Like</Button>
            <Button variant="contained" color="secondary">Comment</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NewsFeed;
