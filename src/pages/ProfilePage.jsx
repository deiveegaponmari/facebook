import { Grid2, ListItem, Button } from "@mui/material";
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import PostModal from "./Home/PostModal";
import CardUpload from "../components/CardUpload";
export default function ProfilePage() {
    const [modelOpen, setModalOpen] = useState(false)
    const [postModal, setPostModal] = useState(false)
    const [uploadFiles, setUploadFiles] = useState([])
    return (
        <Grid2 container direction={"column"} justifyContent={"center"} alignContent={"center"} spacing={3}>
            <Grid2>
                <ListItem>
                    <img src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=400"
                         width={"100%"}
                        alt="rose" />
                </ListItem>
            </Grid2><br /><br /><br /><br /><br /><br />
            <Grid2 container  >
                <Grid2 >
                    <ListItem><AccountCircleIcon fontSize="large" color="primary" /></ListItem>
                </Grid2>
                <Grid2>
                    <ListItem>
                        <Button variant="outlined" onClick={() => setModalOpen(true)}>what's on your mind?</Button>
                        <PostModal open={modelOpen} setModalOpen={setModalOpen} handleClose={() => setModalOpen(false)} setUploadFiles={setUploadFiles} />
                    </ListItem>
                </Grid2>
            </Grid2>
            <Grid2>
                <ListItem>
                    <CardUpload setUploadFiles={setUploadFiles} uploadFiles={uploadFiles} />
                </ListItem>
            </Grid2>
        </Grid2>
    )
}
