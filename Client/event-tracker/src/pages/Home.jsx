import { Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import EventTable from '../components/EventTable';
import EventModule from '../components/EventModule';

const API_URL = 'http://localhost:3000';

function Home() {
    const [events, setEvents] = useState([]); // holds events from api calll

    // state management for the module
    const [eventModuleOpen, setEventModuleOpen] = useState(false);
    const [eventDetails, setEventDetails] = useState({});
    
    const openEventModule = (event) => {
        setEventDetails(event);
        setEventModuleOpen(true);

    };

    const closeEventModule = () => {
        setEventModuleOpen(false);
        setEventDetails({});
    }

    // get events when page loads
    useEffect(() => {
        fetchEvents();
    }, []);



    // function to get Events
    const fetchEvents = async () => {
        try {
            const response = await fetch(`${API_URL}/events`);

            if (!response.ok) {
                console.log("error fetching events")
            }

            const data =  await response.json();
            setEvents(data);

        } catch (err){
            console.log(err);
        }
    }


    return (
        <>
            <Box sx={{ marginTop: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>

                {/* Welcome Information */}
                <Box 
                    sx={{
                        width: "80%",
                        height: "100px",
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
                        Welcome to the Event Manager for the City of Bethlehem!
                    </Typography>

                    <Typography variant="body1">
                        Discover and manage all the latest events happening in our community.  Click on an Event Below to Learn More!
                    </Typography>
                </Box>

                {/* Events Table */}
                <EventTable events={events} openEventModule={openEventModule}/>

                {/* Event Module */}
                <EventModule open={eventModuleOpen} onClose={closeEventModule} event={eventDetails}/>
            </Box>
        </>
    );

    
}

export default Home;