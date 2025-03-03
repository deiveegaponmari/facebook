import React, {  useState ,useEffect} from "react";
import { Grid2, ListItem } from "@mui/material";
import Filter from "../components/Filter";
import FriendRequest from "../components/FriendRequest";
import Status from "./Home/Status";
import CardUpload from "../components/CardUpload";
import Story from "./Home/Story";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FaceBookPage({selectedUser}){
  const [uploadFiles, setUploadFiles] = useState([])
  const [friendData,setFriendData]=useState(null);
  const users={
    vanitha:[
      {
        id:1,
        image:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
        name:"vanitha",
        address:" No. 1, New Bangaru Naidu Colony ,K.K. Nagar (West), Chennai - 600078."
      }
    ],
    Jebastin:[
      {
        id:2,
        image:"https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
        name:"Jebastin",
        address:"C T ROAD, ASHOKA TOWER, PAPANNA LANE, BANGALORE, KARNATAKA, India (IN)"
      }
    ],
    uma:[
      {
        id:3,
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&s",
        name:"uma",
        address:"Juhu Tara Rd, opposite JW Marriott, Juhu Tara, Juhu, Mumbai"
      }
    ]
  }
  console.log('llll uploadFiles :- ', uploadFiles);
  console.log("selected user",selectedUser)

  const { userId } = useParams(); // Get selected user ID from URL
   

    useEffect(() => {
        if (userId) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`)
                .then(response =>{
                  setFriendData(response.data)
                  
                } )
                .catch(error => console.error("Error fetching user data:", error));
        }
    }, [userId]); // Fetch user data when userId changes
return (
      <Grid2 container spacing={2}>
        <Grid2 >
          <ListItem>
            <Story uploadFiles={uploadFiles}/>
          </ListItem>
        </Grid2>
        <Grid2 container>
          <Grid2 size={6}>
          <ListItem>
            <Status setUploadFiles={setUploadFiles}/>
          </ListItem>
          </Grid2>
          <Grid2 size={6}>
            <ListItem>
             {/*  {friendData &&  <FriendRequest users={friendData} />} */}
            <FriendRequest selectedUser={selectedUser}/>
            </ListItem>
          </Grid2>
        </Grid2>
       {/* left side newsfeed and right side post component  */}
        <Grid2 container spacing={1}>
           <Grid2 size={6}>
            <ListItem>
               <CardUpload staticData={true}/> </ListItem>
           </Grid2>
           <Grid2 size={6}>
            <ListItem>
             <CardUpload  staticData={false}/>
            </ListItem>
           </Grid2>
        </Grid2>
        </Grid2>
    )
}