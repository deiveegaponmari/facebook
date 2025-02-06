import { Grid2, ListItem } from "@mui/material";
import Navbar from "../components/Navbar";
import Status from "./Home/Status";
import PostModal from "./Home/PostModal";
import CardUpload from "../components/CardUpload";

export default function Home2(){
    return(
        <Grid2 container>
         <Grid2>
            <ListItem>
               <Navbar/>
            </ListItem>
         </Grid2>
         <Grid2>
            <ListItem>
                <Status/>
            </ListItem>
         </Grid2>
         <Grid2>
            <ListItem><PostModal/></ListItem>
         </Grid2>
         <Grid2>
            <ListItem><CardUpload/></ListItem>
         </Grid2>
         <Grid2>
            <ListItem>
               <CardUpload/>
            </ListItem>
         </Grid2>
         <Grid2>
            <ListItem>suggest profile</ListItem>
         </Grid2>
        </Grid2>
    )
}