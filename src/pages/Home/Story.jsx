import React, { useEffect, useState } from "react";
import axios from "axios";
//import { useDispatch } from "react-redux";
//import { saveStory } from "../../Redux/Reducers/SaveStoryReducer";
import ReactPlayer from 'react-player';
import { Grid2 } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//import { useSelector } from "react-redux";
export default function Story(props) {
    const {uploadFiles} = props;
    console.log('llll uploadFiles 222 :- ', uploadFiles);
    console.log('filess upload: -', uploadFiles);
    // const {storyReducer}=useSelector((state)=>state)
    const [storyData, setStoryData] = useState([])
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/media/getfile`)
            .then((response) => setStoryData(response.data))
            /* setStoryData(response.data)) */
            .catch((error) => {
                console.log(error)
                alert("Failed to load stories")
            })
    }, [uploadFiles])
    return (
        <Grid2 container>
            <Grid2 container spacing={2} justifyContent={'center'} alignItems={"center"}>
                {storyData.map((item, index) => {
                    console.log('files item:-- ', item)
                    return <Card sx={{ maxWidth: 345 }} key={index}>
                        {item.src ? (
                            <>
                                <CardMedia
                                component="img" height="300" image={item.src} alt="post media"
                                    sx={{ height: 140 }}
                                    // image={item.src}
                                    // title="green iguana"
                                />

                            </>
                        ) : (
                            <CardMedia sx={{ height: 200 }}>
                                <ReactPlayer
                                    url={item.videoUrl}
                                    playing={false}
                                    controls={false}
                                    muted={false}
                                    width="100%"
                                    height="100%" />
                            </CardMedia>
                        )}

                    </Card>
                })}
            </Grid2>
        </Grid2>

    )
}