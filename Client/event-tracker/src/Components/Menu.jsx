import { Drawer, Stack, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect} from 'react'

const API_URL = 'http://localhost:3000';

function Menu({ menuOpen, setMenuOpen }) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({ });
    const navigate = useNavigate();

    useEffect(() => {
        // api call to see if logged in
        // if so set the current user of the system
        // otherwise set the current user of the system to {}
    }, [menuOpen])


    const handleLogout = async () => {
        setMenuOpen(false);
        setLoggedIn(false);
        // api call to log out of the system

        // redirect back to home page
        navigate("/");
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
                            <Typography variant="h6" sx={{alignSelf: "center"}}>User Name</Typography>
                            <Typography variant="body2" sx={{alignSelf: "center"}}>User Email</Typography>
                        
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