import { Grid2, ListItem, Fab, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import UploadFile from "../../components/UploadFile";
import { useState } from "react";

export default function Status(props) {
    const {setUploadFiles} = props;
    const[openUpload,setOpenUpload]=useState(false)
    return (
        <Grid2 container justifyContent={"center"}>
            <Grid2>
                <ListItem>
                    <Fab color="primary" aria-label="add">
                        <AddIcon  fontSize="small"  onClick={()=>setOpenUpload(true)}/>
                    </Fab>
                </ListItem>
            </Grid2>
            <Grid2 container direction={"column"}>
                <Grid2>
                    <ListItem>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Create Story
                        </Typography> </ListItem>
                </Grid2>
                <Grid2>
                        <ListItem>
                            <Typography id="modal-modal-title" variant="subtitle1" component="h2">
                                Share a photo or write something
                            </Typography> </ListItem>
                    
                </Grid2>

            </Grid2>
            {openUpload && <UploadFile setUploadFiles={setUploadFiles} type={'media'}  lastEnd={'createmedia'} />}
        </Grid2>
    )
}