import { Box, Typography, Stack, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'http://localhost:3000';

function CreateUser() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();

    // api call to create a new user 
    const handleCreateAccount = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/user/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password
                })
            });

            const data = await res.json();

            if (res.ok) {
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                navigate("/login"); // if sucessfull, redirect to login 
            } else {
                alert("Failed to Create Account, User with Email May Already Exist");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box sx={{width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Stack spacing={3} sx={{width: "400px", height: "500px", bgcolor: '#0a3561', color: "white", borderRadius: 2, p: 3}}>

                <Typography variant='h3' sx={{alignSelf: "center", fontWeight: "bold"}}>
                    Create Account
                </Typography>

                {/* First Name Field */}
                <TextField
                    label="First Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                        marginTop: "50px",

                        // label stays orange
                        "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                        "& .MuiInputLabel-root.MuiFormLabel-root.MuiInputLabel-shrink": { color: "#ff9800" },

                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ff9800",
                        },
                    }}
                />

                {/* Last Name Field */}
                <TextField
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": { backgroundColor: "white" },

                        // label stays orange
                        "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                        "& .MuiInputLabel-root.MuiFormLabel-root.MuiInputLabel-shrink": { color: "#ff9800" },

                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ff9800",
                        },
                    }}
                />

                {/* Email Field */}
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": { backgroundColor: "white" },

                        // label stays orange
                        "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                        "& .MuiInputLabel-root.MuiFormLabel-root.MuiInputLabel-shrink": { color: "#ff9800" },

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
                        "& .MuiOutlinedInput-root": { backgroundColor: "white" },

                        // label stays orange
                        "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                        "& .MuiInputLabel-root.MuiFormLabel-root.MuiInputLabel-shrink": { color: "#ff9800" },

                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ff9800",
                        },
                    }}
                />

                {/* Create Account Button */}
                <Button
                    variant="contained"
                    onClick={handleCreateAccount}
                    disabled={!email || !password || !firstName || !lastName}
                    sx={{
                        backgroundColor: "#ff9800",
                        "&:hover": { backgroundColor: "#e68a00" },

                        // darker orange when disabled
                        "&:disabled": {
                            backgroundColor: "#935800ff",
                            color: "white",
                        },

                        width: "200px",
                        height: "50px",
                        alignSelf: "center"
                    }}
                >
                    Register Account
                </Button>

                {/* Login Link */}
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
