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
export default function Story() {
    // const {storyReducer}=useSelector((state)=>state)
    const [storyData, setStoryData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5173/stories.json")
            .then((response) => setStoryData(response.data))
            .catch((error) => {
                console.log(error)
                alert("Failed to load stories")
            })
    }, [])
    return (
        <Grid2 container>
            <Grid2 container spacing={2} justifyContent={'center'} alignItems={"center"}>
                {storyData.map((item, index) => {
                    return <Card sx={{ maxWidth: 345 }}>
                        {item.type === "image" ? (
                            <>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={item.src}
                                    title="green iguana"
                                />
                            {/*     <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions> */}
                            </>
                        ) : (
                            <CardMedia sx={{ height: 200 }}>
                                <ReactPlayer
                                    url={item.src}
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