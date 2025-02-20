import { Grid2, ListItem, Typography, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    function handleLogin() {
        const payload = {
            email: email,
            password: password
        }
        console.log(payload)
        fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        ).then((response) => {
            console.log(response)
            if (response.ok) {
                alert("Login successful");
                setTimeout(() => {
                    navigate("/:home")
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
                    <Box sx={style}>
                        <Grid2>
                            <ListItem>
                                <Typography variant="h3" color="primary" textAlign={"center"}> facebook</Typography>
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
                            <Button variant="contained" onClick={handleLogin}>Login</Button>
                        </Grid2>
                    </Box>
                </ListItem>
            </Grid2>

        </Grid2>
    )
}
const style = {
    border: "1px solid black",
    padding:"10px"
}