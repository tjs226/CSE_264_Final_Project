import { Box, Typography, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import UserEventTable from '../components/UserEventTable';
import AddEventModule from '../Components/AddEventModule';
import UserEventModule from '../Components/UserEventModule';

const API_URL = 'http://localhost:3000';

function EventsManager() {
    const navigate = useNavigate();
    const [user, setUser] = useState({}); // curent user of the system
    const [loggedIn, setLoggedIn] = useState(false) // if the user is logged in 
    const [events, setEvents] = useState({}); // events beloging to the user
    const [addingOpen, setAddingOpen] = useState(false); // state to open add event module
    const [eventOpen, setEventOpen] = useState(false); // state to open event module for event info
    const [selectedEvent, setSelectedEvent] = useState({}); // state to hold selected event that the user clicks on

    useEffect(() => {
        if (hasToken()){
            getCurrentUser();
        } else {
            setLoggedIn(false);
            setUser({});
            navigate("/login"); // broswer does not have valid token, redirect them to login
        }
    }, [addingOpen, eventOpen]); // need to run this to refresh the table every time we could edit, add, or delete 

    // checks browser to see if it has a token (note: this token may not be valic)
    function hasToken() {
        return document.cookie.includes("token=");
    };

    // api call to get the current user (checks token)
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
                fetchEvents(); // fetch the events that the current user owns
            } else {
                setLoggedIn(false);
                setUser({});
                navigate("/login"); // failed to authenicate user, redirect them to log in
            }
        } catch (err) {
            setUser({});
            setLoggedIn(false);
            console.log(err);
            navigate("/login");
        }
    };

    // api call the get the events belonging to a user
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

    // helper function to open the module for a given event (displays event info)
    const openSelectedEvent = (event) => {
        setEventOpen(true);
        setSelectedEvent(event);
    };

    // helper function to close the module for a given event
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


                    {/* Add Button */}
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

                    {/* Add Event Module (hidden by default)*/}
                    <AddEventModule open={addingOpen} onClose={setAddingOpen}/>

                    {/* Event Module (hidden by default) */}
                    <UserEventModule open={eventOpen} onClose={closeSelectedEvent} event={selectedEvent} />

                </Box>
            }
        </>
    );
    
}

export default EventsManager;