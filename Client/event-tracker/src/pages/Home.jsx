import { Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import EventTable from '../Components/EventTable';
import EventModule from '../Components/EventModule';

const API_URL = 'http://localhost:3000';

function Home() {
    const [events, setEvents] = useState([]);

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
            <Box sx={{marginTop: "100px"}}>

                <EventTable events={events} openEventModule={openEventModule}/>

                <EventModule open={eventModuleOpen} onClose={closeEventModule} event={eventDetails}/>

            </Box>
        </>
    );
    
}

export default Home;