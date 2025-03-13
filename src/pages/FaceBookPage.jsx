import React, { useState } from "react";
import { Grid2, ListItem } from "@mui/material";
import FriendRequest from "../components/FriendRequest";
import Status from "./Home/Status";
import CardUpload from "../components/CardUpload";
import Story from "./Home/Story";
import { useData } from "../context/data";

export default function FaceBookPage({ selectedUser }) {
  const [uploadFiles, setUploadFiles] = useState([])
  const { decodedToken } = useData();
  const currentUserId = decodedToken;
  console.log("current userid",currentUserId)
  console.log('llll uploadFiles :- ', uploadFiles);
  console.log("selected user", selectedUser)

  return (
    <Grid2 container spacing={2}>
     {/*  view status by user */}
      <Grid2 >
        <ListItem>
          <Story uploadFiles={uploadFiles} />
        </ListItem>
      </Grid2>
      <Grid2 container>
        {/* create status by user */}
        <Grid2 size={6}>
          <ListItem>
            <Status setUploadFiles={setUploadFiles} />
          </ListItem>
        </Grid2>
        {/* view selected user bt friend request handle */}
        <Grid2 size={6}>
          <ListItem>
            {/*  {friendData &&  <FriendRequest users={friendData} />} */}
            <FriendRequest selectedUser={selectedUser} currentUserId={currentUserId} />
          </ListItem>
        </Grid2>
      </Grid2>
      {/* left side newsfeed and right side post component  */}
      <Grid2 container spacing={1}>
        <Grid2 size={6}>
          <ListItem>
            <CardUpload staticData={true} /> </ListItem>
        </Grid2>
        <Grid2 size={6}>
          <ListItem>
            <CardUpload staticData={false} />
          </ListItem>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}