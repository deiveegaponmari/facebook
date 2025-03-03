import { Grid2, ListItem, Typography, Box, Button, TextField } from "@mui/material";
import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";
import { Padding } from "@mui/icons-material";
//import.meta.env.VITE_BACKEND_URL;

export default function Signup() {
    const [userName, setUserName] = useState("")
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
   // const API_URL = process.env.REACT_APP_API_URL;
//console.log("API URL:", API_URL);
    function saveData() {
        const payload = {
            username: userName,
            avatar: avatar,
            email: email,
            password: password
        }
        console.log(payload)
        fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        ).then((response) => {
            console.log(response)
            const data = response.json();
            console.log(data)
            if (response.ok) {
                alert("Registration successful");
                setTimeout(() => {
                    navigate("/login")
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <Grid2 container justifyContent={"center"} alignContent={"center"}>
            <Grid2>
                <ListItem>
                    <Grid2 container>
                        <Box sx={style}>
                            <Grid2>
                                <ListItem>
                                    <Typography variant="h3" color="primary" textAlign={"center"}> facebook</Typography>
                                </ListItem>
                            </Grid2>
                            <Grid2>
                                <ListItem>
                                    <TextField id="username" label="username" variant="outlined" placeholder="userName"
                                        onChange={(e) => setUserName(e.target.value)} />
                                </ListItem>
                            </Grid2>
                            <Grid2>
                                <ListItem>
                                    <TextField id="avatar" label="avatar" variant="outlined" placeholder="avatar"
                                        onChange={(e) => setAvatar(e.target.value)} />
                                </ListItem>
                            </Grid2>
                            <Grid2>
                                <ListItem>
                                    <TextField id="email" label="email" variant="outlined" placeholder="email"
                                        onChange={(e) => setEmail(e.target.value)} />
                                </ListItem>
                            </Grid2>
                            <Grid2>
                                <ListItem>
                                    <TextField id="password" label="password" variant="outlined" placeholder="password"
                                        onChange={(e) => setPassword(e.target.value)} />
                                </ListItem>
                            </Grid2>
                            <Grid2 container justifyContent={"center"}>
                                <Button variant="contained" onClick={saveData}>Register</Button>
                            </Grid2>
                            <Grid2>
                                <ListItem><Typography variant="subtitle1" color="primary">Already have an account?
                                </Typography></ListItem>
                            </Grid2>
                            <Grid2 container justifyContent={"center"}>
                                <ListItem>
                                    <Button variant="outlined"><Link to={"/login"} >Login</Link></Button></ListItem>
                            </Grid2>
                        </Box>
                    </Grid2>
                </ListItem>
            </Grid2>

        </Grid2>
    )
}
const style = {
    border: "1px solid black",
    padding: "10px"
}