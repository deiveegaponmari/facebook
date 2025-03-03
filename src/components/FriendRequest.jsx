import { Grid2, ListItem, Avatar, Stack, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import FriendReqModal from "./FriendReqModal";
import { useState } from "react";
export default function FriendRequest({ selectedUser }) {
    console.log("selected user 2: ", selectedUser)
    const [modelOpen, setModalOpen] = useState(false)
    /* console.log(users)
    const { home } = useParams();
    console.log(home)
    const userInformation = users[home] || []; */
    if (!selectedUser) {
        return <Typography variant="h6">No user found</Typography>;
    }
    return (
        <Grid2 container width={"80%"} height={"50%"} display={"flex"} direction={"row"}>
            <Grid2 key={selectedUser['_id']} container direction={"row"} >
                <Grid2>
                    <ListItem>
                        <Stack spacing={2}>
                            <Avatar alt={selectedUser.username} src={selectedUser.avatar} />
                        </Stack>
                    </ListItem>
                </Grid2>
                <Grid2 container display={"flex"} direction={"column"}>
                    <Grid2>
                        <ListItem>
                            <Typography variant="h6">{selectedUser.username}</Typography>
                        </ListItem>
                    </Grid2>
                </Grid2>
                <Grid2>
                    <ListItem>
                        <Button variant="contained" onClick={() => setModalOpen(true)}>Add Friend</Button>
                        <FriendReqModal open={modelOpen} handleClose={() => setModalOpen(false)} />
                    </ListItem>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}