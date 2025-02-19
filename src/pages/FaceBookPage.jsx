import { Grid2, ListItem } from "@mui/material";
import Filter from "../components/Filter";
import FriendRequest from "../components/FriendRequest";
import Status from "./Home/Status";
import CardUpload from "../components/CardUpload";
import Story from "./Home/Story";

export default function FaceBookPage(){
    return (
      <Grid2 container>
        <Grid2>
          <ListItem>
            <Story/>
          </ListItem>
        </Grid2>
        <Grid2>
          <ListItem>
            <Status/>
          </ListItem>
        </Grid2>
       {/*  left side newsfeed and post component upload here */}
        <Grid2 container width={"75%"}>
           <Grid2>
            <ListItem>
               <CardUpload/> </ListItem>
           </Grid2>
           <Grid2>
            <ListItem>
             {/*  <CardUpload/> */}
            </ListItem>
           </Grid2>
        </Grid2>
       {/*  suggestion profiles component upload here */}
        <Grid2 width={"25%"}>
            <ListItem>
              < FriendRequest/>
            </ListItem>
        </Grid2>

      </Grid2>
    )
}