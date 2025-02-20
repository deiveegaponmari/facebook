import React from "react";
import { Card, CardContent, CardHeader, Avatar, Typography, CardMedia, CardActions, IconButton, Button } from "@mui/material";
import { Favorite, Share, MoreVert, ChatBubbleOutline } from "@mui/icons-material";

const posts = [
  {
    id: 1,
    username: "vanitha",
    avatar: "https://i.pravatar.cc/150?img=3",
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
    media: "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW90aXZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    type: "image"
  },
  {
    id: 3,
    username: "Michael Scott",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "1d ago",
    content: "Check out this funny moment from the office! 😂",
    media: "https://media.istockphoto.com/id/2160360708/photo/businesswoman-analyze-the-profitability-of-companies-using-digital-graphs-positive-trends-for.webp?a=1&b=1&s=612x612&w=0&k=20&c=FvmLoq2AQgXwdAaOW-elPls8ulMMSpl_HbCN7ZlfzPo=",
    type: "image"
  },
  {
    id: 4,
    username: "Sarah Connor",
    avatar: "https://img.freepik.com/free-vector/pink-rose-with-green-leaves_1308-11567.jpg?ga=GA1.1.688042556.1704957884&semt=ais_hybrid",
    time: "3d ago",
    content: "Just finished an intense workout session! 💪",
    media: "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW90aXZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    type: "image"
  },
  {
    id: 5,
    username: "David Beckham",
    avatar: "https://i.pravatar.cc/150?img=5",
    time: "4d ago",
    content: "Football is life! ⚽",
    media: "https://plus.unsplash.com/premium_photo-1674489620667-eaf4a0094996?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1vdGl2YXRpb258ZW58MHx8MHx8fDA%3D",
    type: "image"
  },
  {
    id: 6,
    username: "Taylor Swift",
    avatar: "https://i.pravatar.cc/150?img=6",
    time: "6d ago",
    content: "Here’s a sneak peek of my new music video! 🎶",
    media: "https://videos.pexels.com/video-files/3971351/3971351-sd_640_360_25fps.mp4",
    type: "video"
  },
  {
    id: 7,
    username: "Elon Musk",
    avatar: "https://i.pravatar.cc/150?img=7",
    time: "1w ago",
    content: "Mars mission updates coming soon! 🚀",
    media: "https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vdGl2YXRpb258ZW58MHx8MHx8fDA%3D",
    type: "image"
  },
  {
    id: 8,
    username: "Steve Jobs",
    avatar: "https://img.freepik.com/premium-photo/beautiful-bright-pink-rose-flower-isolated-white-background-studio-lights_969690-86.jpg?ga=GA1.1.688042556.1704957884&semt=ais_hybrid",
    time: "2w ago",
    content: "Stay hungry, stay foolish.",
    media: "https://images.unsplash.com/photo-1521833965051-8273d0579115?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1vdGl2YXRpb258ZW58MHx8MHx8fDA%3D",
    type: "image"
  },
  {
    id: 9,
    username: "Bill Gates",
    avatar: "https://i.pravatar.cc/150?img=9",
    time: "3w ago",
    content: "Technology is best when it brings people together.",
    media: "https://media.istockphoto.com/id/1466703379/photo/inspirational-and-motivational-quote.webp?a=1&b=1&s=612x612&w=0&k=20&c=wIu_h6dnz9D5m7TRDDXzLcyxfBmPea5x7gx2RRcLBTk=",
    type: "image"
  },
  {
    id: 10,
    username: "Mark Zuckerberg",
    avatar: "https://img.freepik.com/free-vector/blooming-flower_1308-82989.jpg?ga=GA1.1.688042556.1704957884&semt=ais_hybrid",
    time: "1m ago",
    content: "Building the future of social networking!",
    media: "https://videos.pexels.com/video-files/4762374/4762374-sd_506_960_24fps.mp4",
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
