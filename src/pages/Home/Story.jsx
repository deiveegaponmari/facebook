 import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from 'react-player';
import { Grid2,Typography} from "@mui/material";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';


export default function Story(props) {
    const {uploadFiles} = props;
    console.log('llll uploadFiles 222 :- ', uploadFiles);
    console.log('filess upload: -', uploadFiles);
   
    const [storyData, setStoryData] = useState([])
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/media/getfile`)
        .then((response) => {
            // Filter out expired stories (older than 24 hours)
            const currentTime = new Date().getTime();
            const filteredStories = response.data.filter(story => {
                const storyTime = new Date(story.createdAt).getTime();
                return (currentTime - storyTime) <= 24 * 60 * 60 * 1000; // 1-day limit
            });

            setStoryData(filteredStories);
        })
        .catch((error) => {
            console.log(error);
            alert("Failed to load stories");
        });
    }, [uploadFiles])
    console.log("storydata",storyData)
    return (
        <Grid2 container spacing={2} justifyContent="center" alignItems="center">
        {storyData.length === 0 ? (
            <Typography variant="h6" color="textSecondary">
                No stories available (Stories expire after 24 hours)
            </Typography>
        ) : (
            storyData.map((item, index) => (
                <Card sx={{ maxWidth: 345 }} key={index}>
                    {item.imageUrl ? (
                        <CardMedia component="img" height="300" image={item.imageUrl} alt="post media" sx={{ height: 140 }} />
                    ) : (
                        <CardMedia sx={{ height: 200 }}>
                            <ReactPlayer url={item.videoUrl} playing={false} controls={true} width="100%" height="100%" />
                        </CardMedia>
                    )}
                </Card>
            ))
        )}
    </Grid2>

    )
} 
