import { useState ,useEffect} from "react";
import { Drawer, List, ListItem, ListItemAvatar, ListItemText, Avatar, TextField, Typography, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";



const friendsList = [
  { name: "Mailsamy Samy", avatar: "https://i.pravatar.cc/150?img=1", lastMessage: "Hii - 8h" },
  { name: "Anu Anusha", avatar: "https://i.pravatar.cc/150?img=2", lastMessage: "Hi - 5d" },
  { name: "Rathika Rathika", avatar: "https://i.pravatar.cc/150?img=3", lastMessage: "You are now connected" }
];

export default function ChatSidebar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
const[friendData,setFriendData]=useState([])
  const toggleDrawer = () => setOpen(!open);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/friendlist/data`)
      .then((response) => setFriendData(response.data))
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <>
      {/* Floating Chat Button */}
      <IconButton 
        color="primary" 
        sx={{ position: "fixed", bottom: 20, right: 20, backgroundColor: "white", borderRadius: "50%" }} 
        onClick={toggleDrawer}
      >
        <ChatIcon />
      </IconButton>

      {/* Chat Drawer */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <div style={{ width: 300, padding: 16 }}>
          <Typography variant="h6" sx={{ display: "flex", justifyContent: "space-between" }}>
            Chats
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Typography>

          {/* Search Bar */}
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search Messenger"
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Friends List */}
          <List>
            {friendData
              .filter((friend) => friend.name.toLowerCase().includes(search.toLowerCase()))
              .map((friend, index) => (
                <ListItem button key={index} onClick={() => alert(`Open chat with ${friend.name}`)}>
                  <ListItemAvatar>
                    <Avatar src={friend.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={friend.name} secondary={friend.lastMessage} />
                </ListItem>
              ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}
