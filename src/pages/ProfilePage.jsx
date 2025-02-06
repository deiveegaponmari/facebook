import { Grid2, ListItem } from "@mui/material"
export default function ProfilePage() {
    const [modelOpen, setModalOpen] = useState(false)
    const [postModal, setPostModal] = useState(false)
    return (
        <Grid2 container>
            <Grid2>
                <ListItem>profileimage</ListItem>
            </Grid2>
            <Grid2 container justifyContent={"center"}>
                <Grid2 container>
                    <Grid2>
                        <ListItem><AccountCircleIcon fontSize="large" color="primary" /></ListItem>
                    </Grid2>
                    <Grid2>
                        <ListItem>
                            <Button variant="outlined" onClick={() => setModalOpen(true)}>what's on your mind?</Button>
                            <PostModal open={modelOpen} handleClose={() => setModalOpen(false)} />
                        </ListItem>
                    </Grid2>
                    <Grid2>
                        <ListItem>{/* photo/video upload icon component add here */}</ListItem>
                    </Grid2>
                </Grid2>

            </Grid2>
            <Grid2>
                <ListItem>3</ListItem>
            </Grid2>
        </Grid2>
    )
}