import { Box, Typography, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import UserEventTable from '../Components/UserEventTable';
import AddEventModule from '../Components/AddEventModule';
import UserEventModule from '../Components/UserEventModule';

const API_URL = 'http://localhost:3000';

function EventsManager() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false)
    const [events, setEvents] = useState({});
    const [addingOpen, setAddingOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [eventOpen, setEventOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});

    useEffect(() => {
        if (hasToken()){
            getCurrentUser();
        } else {
            setLoggedIn(false);
            setUser({});
            navigate("/login");
        }
    }, [addingOpen, deleteOpen, eventOpen]);

    function hasToken() {
        return document.cookie.includes("token=");
    };

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
                fetchEvents();
            } else {
                setLoggedIn(false);
                setUser({});
                navigate("/login");
            }
        } catch (err) {
            setUser({});
            setLoggedIn(false);
            console.log(err);
            navigate("/login");
        }
    };

    const fetchEvents = async () => {
        try {
            const res = await fetch(`${API_URL}/user/events`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!res.ok) {
                console.log("error fetching events")
            }

            const data = await res.json();
            setEvents(data);
        } catch (err) {
            console.log(err);
        }
    };

    const openSelectedEvent = (event) => {
        setEventOpen(true);
        setSelectedEvent(event);
    };

    const closeSelectedEvent = () => {
        setEventOpen(false);
        setSelectedEvent(false);
    };


    return (
        <>
            {loggedIn && 
                <Box sx={{ marginTop: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>

                    {/* Welcome Information */}
                    <Box 
                        sx={{
                            width: "60%",
                            height: "80px",
                            bgcolor: "rgba(10, 53, 97, 0.85)", 
                            color: "white",
                            padding: "20px 30px",
                            borderRadius: "10px",
                            mb: 4,
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                            textAlign: "center",
                            backdropFilter: "blur(6px)" 
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                            {`Welcome, ${user.first_name}`}
                        </Typography>

                        <Typography variant="body1">
                            Use this page to manage and create events
                        </Typography>
                    </Box>

                    
                    {/* User Events Table */}
                    <UserEventTable events={events} openEventModule={openSelectedEvent}/>


                    {/* Add Button*/}
                    <IconButton
                        size="large"
                        aria-label="add event"
                        onClick={() => setAddingOpen(true)}
                        sx={{
                            bgcolor: "#ff9800",
                            marginTop: "30px",
                            color: "white",
                            "&:hover": { bgcolor: "#e68a00" },
                            mb: 3,
                            boxShadow: 3, 
                        }}
                    >
                        <AddIcon />
                    </IconButton>

                    {/* Add Event Module (hidden)*/}
                    <AddEventModule open={addingOpen} onClose={setAddingOpen}/>

                    {/* Event Module (hidden) */}
                    <UserEventModule open={eventOpen} onClose={closeSelectedEvent} event={selectedEvent} />

                </Box>
            }
        </>
    );
    
}

export default EventsManager;