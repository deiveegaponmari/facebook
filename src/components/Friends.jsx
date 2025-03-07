import  React,{useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Friends({friendReqUser, selectedUser,setconfirmUser}) {
    console.log('friendReqUser :p--- ', friendReqUser)
    function handleConfirm(){
      console.log("confirm clicked");
      console.log( "selected user",selectedUser)
      setconfirmUser( selectedUser)
    }
  return (
    <Card sx={{ maxWidth: 345 }}>
        <Typography gutterBottom variant="h5" component="div">
          Friend Requests
        </Typography>

      <CardMedia
        sx={{ height: 140 }}
        image={friendReqUser.avatar}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {friendReqUser.username}
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth onClick={handleConfirm}>Confirm</Button>
        <Button fullWidth>Delete</Button>
      </CardActions>
    </Card>
  );
}