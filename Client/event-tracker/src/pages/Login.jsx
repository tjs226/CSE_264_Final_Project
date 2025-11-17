import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import {useState, useEffect } from 'react'

const API_URL = 'http://localhost:3000';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setEmail("");
        setPassword("");
    }, [])

    const handleLogin = () => {
        // api call to login (use states for email and password)

        // redirect to manage events page if successfull
        navigate("/manage-events");
    };

    return (
        <Box sx={{width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Stack spacing={3} sx={{width: "300px", height: "330px", bgcolor: '#0a3561', color: "white", borderRadius: 2, p: 3}}>

                <Typography variant='h3' sx={{alignSelf: "center", fontWeight: "bold"}}>
                    Login
                </Typography>

                {/* Email Field */}
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                        },
                        marginTop: "50px",
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#ff9800",
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ff9800",
                        },
                    }}
                />

                {/* Password Field */}
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#ff9800",
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ff9800",
                        },
                    }}
                />

                {/* Login Button */}
                <Button
                    variant="contained"
                    onClick={handleLogin}
                    sx={{ backgroundColor: "#ff9800", "&:hover": { backgroundColor: "#e68a00"}, width: "120px", alignSelf: "center" }}
                >
                    Log In
                </Button>
                

                {/* Create Account Text */}
                <Box sx={{ alignSelf: "center" }}>
                    <Link to='/create-account' style={{ textDecoration: "none" }}>
                        <Typography sx={{ color: "white", "&:hover": { textDecoration: "underline" } }}>
                            Don't Have An Account?
                        </Typography>
                    </Link>
                </Box>
            

            </Stack>
        </Box>
    );
}


export default Login;
