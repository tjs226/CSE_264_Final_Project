import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setEmail("");
        setPassword("");
    }, []);

    const handleLogin = async () => {
        try{
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if(res.ok){
                setEmail("");
                setPassword("");
                navigate("/manage-events");
            } else if (res.status === 401) {
                alert("Invalid Email / Password");
            }else {
                console.log("Error Logging in")
            }
        } catch (err){
            console.log(err);
        }
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

                        // orange label on focus & when filled
                        "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                        "& .MuiInputLabel-root.MuiInputLabel-shrink": { color: "#ff9800" },

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

                        // orange label on focus & shrink
                        "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                        "& .MuiInputLabel-root.MuiInputLabel-shrink": { color: "#ff9800" },

                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ff9800",
                        },
                    }}
                />

                {/* Login Button */}
                <Button
                    variant="contained"
                    onClick={handleLogin}
                    disabled={!email || !password}
                    sx={{
                        backgroundColor: "#ff9800",
                        "&:hover": { backgroundColor: "#e68a00" },

                        // Disabled styling
                        "&.Mui-disabled": {
                            backgroundColor: "#935800",
                            color: "white",
                            },

                        width: "120px",
                        alignSelf: "center",
                    }}
                >
                    Log In
                </Button>

                {/* Create Account Link */}
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
