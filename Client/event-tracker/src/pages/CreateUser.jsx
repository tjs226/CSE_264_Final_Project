import { Box, Typography, Stack, TextField, Button } from '@mui/material';
import  {useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'http://localhost:3000';

function CreateUser() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        setEmail("");
        setPassword("");
    }, [])


    const handleCreateAccount = () => {
        // api to to create the new user 


        // if successfull, redirect to the lgoin screen 
        navigate("/login");
    };

    return (
       <Box sx={{width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Stack spacing={3} sx={{width: "400px", height: "360px", bgcolor: '#0a3561', color: "white", borderRadius: 2, p: 3}}>

                <Typography variant='h3' sx={{alignSelf: "center", fontWeight: "bold"}}>
                    Create Account
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

                {/* Create Account Button */}
                <Button
                    variant="contained"
                    onClick={handleCreateAccount}
                    sx={{ backgroundColor: "#ff9800", "&:hover": { backgroundColor: "#e68a00"}, width: "200px", height: "50px",alignSelf: "center" }}
                >
                    Register Account
                </Button>
                

                {/* Create Account Text */}
                <Box sx={{ alignSelf: "center" }}>
                    <Link to='/login' style={{ textDecoration: "none" }}>
                        <Typography sx={{ color: "white", "&:hover": { textDecoration: "underline" } }}>
                            Already Have An Account?
                        </Typography>
                    </Link>
                </Box>
            
            </Stack>
        </Box>
    );
    
}

export default CreateUser;