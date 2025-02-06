import { Grid2, ListItem, Avatar, Stack, Typography, Button } from "@mui/material";

export default function FriendRequest() {
    return (
        <Grid2 container width={"50%"} height={"50%"} display={"flex"} direction={"row"}>
            <Grid2>
                <ListItem>
                    <Stack spacing={2}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </Stack>
                </ListItem>
            </Grid2>
            <Grid2 container display={"flex"} direction={"column"}>
                <Grid2>
                    <ListItem>
                        <Typography variant="h6">Devi</Typography>
                    </ListItem>
                </Grid2>
                <Grid2>
                    <ListItem>
                        <Typography variant="h6">Address</Typography>
                    </ListItem>
                </Grid2>
            </Grid2>
            <Grid2>
                <ListItem>
                    <Button variant="contained">Add Friend</Button>
                </ListItem>
            </Grid2>
        </Grid2>
    )
}