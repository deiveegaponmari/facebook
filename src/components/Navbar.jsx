export default function Navbar() {
    const navigate = useNavigate();
    const [chatOpen, setChatOpen] = useState(false);
    const [newMessage, setNewMessage] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [selectedChatUserId, setSelectedChatUserId] = useState("recipient-user-id"); // Update dynamically

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user._id) {
            setLoggedInUserId(user._id);
        }
    }, []);

    useEffect(() => {
        socket.on("receive_message", (message) => {
            console.log("New message received:", message);
            setNewMessage(true);
        });

        return () => {
            socket.off("receive_message");
        };
    }, []);

    function toggleChat() {
        setChatOpen(!chatOpen);
        setNewMessage(false);
    }

    return (
        <Grid2>
            <ListItem>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" color="transparent">
                        <Grid2 container justifyContent={"space-between"}>
                            <Grid2 container gap={1}>
                                <Grid2>
                                    <ListItem>
                                        <a href="#">
                                            <img src="https://img.freepik.com/premium-vector/art-illustration_929495-41.jpg"
                                                alt="facebook logo" style={{ width: "45px", height: "45px" }} />
                                        </a>
                                    </ListItem>
                                </Grid2>
                                <Grid2>
                                    <ListItem>
                                        <Autocomplete
                                            disablePortal
                                            options={[{ label: "vanitha" }, { label: "Jebastin" }, { label: "uma" }]}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Search Facebook" />}
                                            onChange={(_, value) => {
                                                if (value) {
                                                    navigate("/" + value.label);
                                                }
                                            }}
                                        />
                                    </ListItem>
                                </Grid2>
                            </Grid2>
                            <Grid2 container gap={2} padding={1}>
                                <Grid2>
                                    <Link to={"/home"}>
                                        <HomeIcon color="primary" sx={{ fontSize: 40 }} />
                                    </Link>
                                </Grid2>
                            </Grid2>
                            <Grid2 container gap={2} padding={1}>
                                <Grid2>
                                    <Badge color="error" variant={newMessage ? "dot" : "standard"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                            onClick={toggleChat} width="40" height="40" viewBox="0 0 50 50">
                                            <path d="M 25 2 C 12.300781 2 2 11.601563 2 23.5 C 2 29.800781 4.898438 35.699219 10 39.800781 L 10 48.601563 L 18.601563 44.101563 C 20.699219 44.699219 22.800781 44.898438 25 44.898438 C 37.699219 44.898438 48 35.300781 48 23.398438 C 48 11.601563 37.699219 2 25 2 Z M 27.300781 30.601563 L 21.5 24.398438 L 10.699219 30.5 L 22.699219 17.800781 L 28.601563 23.699219 L 39.101563 17.800781 Z"></path>
                                        </svg>
                                    </Badge>
                                    {chatOpen && (
                                        <Grid2 style={{
                                            position: "fixed",
                                            bottom: "80px",
                                            right: "20px",
                                            width: "300px",
                                            height: "400px",
                                            background: "white",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                            borderRadius: "10px",
                                            padding: "10px",
                                            zIndex: 10
                                        }}>
                                            <Chat 
                                                currentUserId={loggedInUserId} 
                                                recipientId={selectedChatUserId} 
                                            />
                                            <button onClick={toggleChat} style={{ float: "right", marginTop: "10px" }}>Close</button>
                                        </Grid2>
                                    )}
                                </Grid2>
                                <Grid2>
                                    <Link to={"/profile"}>
                                        <AccountCircleIcon sx={{ fontSize: 40 }} color="primary" />
                                    </Link>
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </AppBar>
                </Box>
            </ListItem>
        </Grid2>
    );
}
