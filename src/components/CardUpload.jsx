import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid2, ListItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function CardUpload() {
  return (
    <Grid2 container direction={"column"}>
      <Grid2 container>
        <Grid2>
          <ListItem>
            <AccountCircleIcon />
          </ListItem>
        </Grid2>
        <Grid2>
          <ListItem>
            <Typography variant='standard'>Karthika</Typography>
          </ListItem>
        </Grid2>
      </Grid2>
      <Grid2>
        <ListItem>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
            />
           {/*  <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent> */}
            <CardActions>
              <Button size="small">Like</Button>
              <Button size="small">Comment</Button>
            </CardActions>
          </Card>
        </ListItem>
      </Grid2>
    </Grid2>
    /*  <Card sx={{ maxWidth: 345 }}>
   <CardMedia
     component="img"
     alt="green iguana"
     height="140"
     image="/static/images/cards/contemplative-reptile.jpg"
   />
   <CardContent>
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
   </CardActions>
 </Card> */
  )
}