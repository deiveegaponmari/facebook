import { Grid2, ListItem, Avatar, Stack, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import FriendReqModal from "./FriendReqModal";
import { useState } from "react";
export default function FriendRequest({ users }) {
    const [modelOpen, setModalOpen] = useState(false)
    console.log(users)
    const { home } = useParams();
    console.log(home)
    const userInformation = users[home] || [];
    if (userInformation.length === 0) {
        return <Typography variant="h6">No user found</Typography>;
    }
    return (
        <Grid2 container width={"80%"} height={"50%"} display={"flex"} direction={"row"}>
            {
                userInformation.map((user, index) => {
                    return <Grid2 key={index} container direction={"row"} >
                        <Grid2>
                            <ListItem>
                                <Stack spacing={2}>
                                    <Avatar alt={user.name} src={user.image} />
                                </Stack>
                            </ListItem>
                        </Grid2>
                        <Grid2 container display={"flex"} direction={"column"}>
                            <Grid2>
                                <ListItem>
                                    <Typography variant="h6">{user.name}</Typography>
                                </ListItem>
                            </Grid2>
                            <Grid2>
                                <ListItem>
                                    <Typography variant="h6">{user.address}</Typography>
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
                })
            }

        </Grid2>
    )
}