import { Drawer, Stack, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect} from 'react'

const API_URL = 'http://localhost:3000';

function Menu({ menuOpen, setMenuOpen }) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({ });
    const navigate = useNavigate();

    // api call to see if logged in
    // if so set the current user of the system
    // otherwise set the current user of the system to {}
    useEffect(() => {
        if (menuOpen && hasToken()){
            getCurrentUser();
        }
    }, [menuOpen]);

    function hasToken() {
        return document.cookie.includes("token=");
    }

    const getCurrentUser = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/user/current`, {
                method: "GET",
                credentials: "include",
            });
            
            if (res.ok) {
                const data = await res.json();
                setLoggedIn(true);
                setUser(data);
            } else {
                setLoggedIn(false);
                setUser({});
            }
        } catch (err) {
            setLoggedIn(false);
            setUser({});
            console.log(err);
        }
    };

    const handleLogout = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            if (res.ok){
                setMenuOpen(false);
                setLoggedIn(false);
                setUser({});
                navigate("/");
            }else {
                console.log("error logging out");
                alert("error logging out");
            }

        } catch (err) {
            console.log(err);
            alert("error logging out");
        }
    };

    const linkStyle = {
        color: "white",
        textDecoration: "none",
    };

    const menuItem = {
        padding: "6px 0",
        cursor: "pointer",
        "&:hover": {
            opacity: 0.7
        }
    };

    
    return (
        <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)} slotProps={{ paper: { sx: { width: 250, bgcolor: '#0a3561', color: 'white' }}}}>
            <Stack spacing={2} sx ={{p: 2}}>
                {
                    loggedIn ? ( // if they are logged in Show User Information 
                        <>
                            <Typography variant="h6" sx={{alignSelf: "center"}}>{`${user.first_name} ${user.last_name}`}</Typography>
                            <Typography variant="body2" sx={{alignSelf: "center"}}>{user.email}</Typography>
                        
                            <div style={{ height: "1px", background: "rgba(255,255,255,0.3)", margin: "8px 0" }}></div>

                            <Link to="/" style={linkStyle} onClick={() => setMenuOpen(false)}>
                                <Typography sx={menuItem}>Home</Typography>
                            </Link>

                            <Link to="/manage-events" style={linkStyle} onClick={() => setMenuOpen(false)}>
                                <Typography sx={menuItem}>My Events</Typography>
                            </Link>

                            <Typography sx={menuItem} onClick={handleLogout}>
                                Log Out
                            </Typography>
                        </>
                    ) : ( 
                        <>
                            <Link to="/" style={linkStyle} onClick={() => setMenuOpen(false)}>
                                <Typography sx={menuItem}>Home</Typography>
                            </Link>

                            <Link to="/manage-events" style={linkStyle} onClick={() => setMenuOpen(false)}>
                                <Typography sx={menuItem}>My Events</Typography>
                            </Link>

                            <Link to="/login" style={linkStyle} onClick={() => setMenuOpen(false)}>
                                <Typography sx={menuItem}>
                                    Log In
                                </Typography>
                            </Link>
                        </>
                    )
                }
            </Stack>
        </Drawer>
    );
}

export default Menu;