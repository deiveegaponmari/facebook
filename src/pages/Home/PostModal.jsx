import React from "react";
import { Modal, Box, Typography, Grid2, ListItem, Button } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import UploadFile from "../../components/UploadFile";
export default function PostModal({ open, handleClose }) {
    function handlePost(){
        console.log("post clicked")
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid2 container>
                        {/*  create post text and icon created */}
                        <Grid2 container>
                            <Grid2>
                                <ListItem>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Create Post
                                    </Typography>
                                </ListItem>
                            </Grid2>
                            {/* clear icon added */}
                            <Grid2>
                                <ListItem>
                                    <CloseIcon onClick={handleClose}/>
                                </ListItem>
                            </Grid2>
                        </Grid2>
                        {/* account icon add and file upload component */}
                        <Grid2 container>
                            <Grid2>
                                <ListItem><AccountCircleIcon /></ListItem>
                            </Grid2>
                            <Grid2>
                                <ListItem>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        what's on your mind,
                                    </Typography>
                                </ListItem>
                            </Grid2>
                            <Grid2>
                                <ListItem>
                                    <UploadFile/> 
                                </ListItem>
                            </Grid2>
                             {/* <Grid2>
                                <ListItem>
                                    <Button variant="standard" fullWidth>Add to your post
                                         upload file icon component add here *
                                    </Button>
                                </ListItem>
                            </Grid2> */} 
                            <Grid2>
                                <ListItem>
                                    <Button variant="standard" fullWidth onClick={handlePost}>
                                        Post
                                    </Button>
                                </ListItem>
                            </Grid2>
                        </Grid2>
                    </Grid2>


                </Box>
            </Modal>
        </>
    )
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};