import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Divider, Box, Stack, TextField, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { toStandardTime } from '../utlilities/Time'
import DeleteConfirmationModule from './DeleteConfirmationModule';

const API_URL = 'http://localhost:3000';

function UserEventModule({ open, onClose, event }) {
    // open is the condition to open the module
    // onClose is the closeModule function to reset the selected event and close the module
    // event is the selected event

    const [isEditing, setIsEditing] = useState(false); // state to switch between viewing and editing mode
    const [isDeleting, setIsDeleting] = useState(false); // state to display a delete confirmation 

    /* State for each component of an event becuase we could edit them (thats why they must be individual) */
    const [name, setName] = useState(''); // state to hold the name of the event
    const [date, setDate] = useState(''); // state to hold the date of the event
    const [startTime, setStartTime] = useState(''); // state to hold the start time of the event 
    const [endTime, setEndTime] = useState(''); // state to hold the end time of the event 
    const [location, setLocation] = useState(''); // state to hold the location of the event 
    const [description, setDescription] = useState(''); // state to hold the desc of the event 
    const [rsvp, setRsvp] = useState(''); // state to hold the rsvp amount (not editable!!!)

    useEffect(() => {
        if (event.id) {
            fetchEventInfo(); 
        }
    }, [event, isEditing, isDeleting]); // since we can edit we much fetch the new info often

    // api call to ge the informatio for an event
    const fetchEventInfo = async () => {
        try {
            const res = await fetch(`${API_URL}/events/${event.id}`, {
                method: "GET",
                credentials: "include",  // include cookies if needed
            });

            const data = await res.json();

            if (res.ok) {
                setName(data.name || '');
                setDate(data.date || '');
                setStartTime(data.start_time || '');
                setEndTime(data.end_time || '');
                setLocation(data.location || '');
                setDescription(data.description || '');
                setRsvp(data.rsvp_amount || '0');
            } else {
                console.log("error fetching event");
                alert("Error Fetching Event");
            }

        } catch (err) {
            console.log(err);
            alert("failed to get event")
        }
    }

    // api call to update an event (flushes states to database)
    const handleUpdate = async () => {
        try {
            const res = await fetch(`${API_URL}/user/events/${event.id}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    date,
                    start_time: startTime,
                    end_time: endTime,
                    location,
                    description,
                }),
            });

            const data = await res.json();

        if (!res.ok) {
            console.log("error saving update");
            alert("Failed to update")
        }

        setIsEditing(false);
        } catch (err) {
            console.log(err);
            setIsEditing(false);
        }
    };

    /* Handles the state logic for the effect that you are clicking out of 
     * a module when really you just want to toggle between editing mode 
     * or exiting the window 
    */
    const closeLogic = () => {
        if (isEditing){
            setIsEditing(false);
        }else {
            setIsEditing(false);
            onClose();
        }
    }

    return (
        <Dialog open={open} onClose={closeLogic} maxWidth="sm" fullWidth
            slotProps={{ paper: { sx: { borderRadius: 3, p: 2, bgcolor: "#fefefe" } } }}
        >
            <DialogTitle component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 0 }}>
                
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0a3561' }}>
                    {isEditing ? "Edit Event" : name}
                </Typography>

                {isEditing ? (
                        <>
                            <IconButton onClick={() => { setIsEditing(false); }}> {/* turns off editing mode */}
                                <CloseIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <IconButton onClick={() => { setIsEditing(false); onClose(); }}> {/* closes the event module */}
                                <CloseIcon />
                            </IconButton>
                        </>
                    )
                }

            </DialogTitle>


            <DialogContent sx={{ pt: 1 }}>
                <Divider sx={{ mb: 2 }} />
                
                {/* if edit mode display text boxes and selectors, otherwise display plain text*/}
                {isEditing ? (
                    <Stack spacing={2}>
                        <TextField label="Event Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
                        
                        <TextField
                            label="Date" type="date" value={date}
                            onChange={(e) => setDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />

                        <Stack direction="row" spacing={2}>
                            <TextField
                            label="Start Time" type="time" value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            InputLabelProps={{ shrink: true }} sx={{ flex: 1 }}
                            />

                            <TextField
                                label="End Time" type="time" value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                InputLabelProps={{ shrink: true }} sx={{ flex: 1 }}
                            />

                        </Stack>
                        
                        <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} fullWidth required />

                        <TextField
                            label="Description" value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline rows={3} fullWidth
                        />
                    </Stack>
                ) : (
                    <Stack spacing={2}>
                        <Typography><strong>Date:</strong> {date}</Typography>
                        <Typography><strong>Start:</strong> {toStandardTime(startTime)}</Typography>
                        <Typography><strong>End:</strong> {toStandardTime(endTime)}</Typography>
                        <Typography><strong>Location:</strong> {location}</Typography>
                        <Typography sx={{ whiteSpace: 'pre-line' }}><strong>Description:</strong> {description}</Typography>
                        <Typography><strong>RSVP's:</strong> {rsvp}</Typography>
                    </Stack>
                )}

            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center' }}>
                {/* if editing display cancel and save buttons, other wise edit or delete buttons */}
                {isEditing ? (
                    <>
                        <Button onClick={() => { setIsEditing(false); }}>Cancel</Button>
                        <Button variant="contained" onClick={handleUpdate} color="primary">Save</Button>
                    </>
                ) : (
                    <>
                        <IconButton onClick={() => setIsEditing(true)} color="primary" aria-label="edit">
                            <EditIcon sx={{color: "primary"}}/>
                        </IconButton>

                        <IconButton onClick={() => setIsDeleting(true)} color="primary" aria-label="edit"> {/* Opens Delete confirmation */}
                            <DeleteIcon sx={{color: "red"}}/>
                        </IconButton>

                        {/* Delete Module */}
                        <DeleteConfirmationModule 
                            open={isDeleting} 
                            onCancel={setIsDeleting} 
                            onDelete={onClose} 
                            eventId={event.id}
                            eventName={event.name}
                        />
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default UserEventModule;
