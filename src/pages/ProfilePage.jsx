import { Grid, Avatar, Button, Typography, Stack, Box } from "@mui/material";
import PostModal from "./Home/PostModal";
import CardUpload from "../components/CardUpload";
import { useEffect, useState } from "react";
import { useData } from "../context/data";
import axios from "axios";

export default function ProfilePage() {
    const [modelOpen, setModalOpen] = useState(false);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [data, setData] = useState({});
    const { decodedToken } = useData();
    const currentId = decodedToken.userId;

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${currentId}`)
            .then((res) => {
                setData(res.data);
            });
    }, [currentId]);

    return (
        <Grid container direction="column" alignItems="center" spacing={3} sx={{ mt: 4 }}>
            {/* Profile Header */}
            <Stack spacing={2} alignItems="center">
                <Avatar src={data.avatar} alt={data.username} sx={{ width: 100, height: 100 }} />
                <Typography variant="h5">{data.username}</Typography>
                <Button variant="outlined" sx={{ textTransform: "none", borderRadius: "20px" }} onClick={() => setModalOpen(true)}>
                    What's on your mind, {data.username}?
                </Button>
                <PostModal open={modelOpen} setModalOpen={setModalOpen} handleClose={() => setModalOpen(false)} setUploadFiles={setUploadFiles} />
            </Stack>

            {/* Upload Section */}
            <Box width="100%" display="flex" justifyContent="center">
                <CardUpload setUploadFiles={setUploadFiles} uploadFiles={uploadFiles} />
            </Box>
        </Grid>
    );
}
