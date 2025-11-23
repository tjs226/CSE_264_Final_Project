import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Divider, Box, Stack, TextField, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { toStandardTime } from '../utlilities/Time'
import DeleteConfirmationModule from './DeleteConfirmationModule';

const API_URL = 'http://localhost:3000';

function UserEventModule({ open, onClose, event }) {
    const [isEditing, setIsEditing] = useState(false); // toggle from edit mode
    const [isDeleting, setIsDeleting] = useState(false);

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [rsvp, setRsvp] = useState('');

    useEffect(() => {
        if (event.id) {
            fetchEventInfo(); // since we can edit we much fetch the new info often
        }
    }, [event, isEditing, isDeleting]);

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

    /* Handles the state logic for the effect that you arr clicking out of 
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
                            <IconButton onClick={() => { setIsEditing(false); }}>
                                <CloseIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <IconButton onClick={() => { setIsEditing(false); onClose(); }}>
                                <CloseIcon />
                            </IconButton>
                        </>
                    )
                }

            </DialogTitle>


            <DialogContent sx={{ pt: 1 }}>
                <Divider sx={{ mb: 2 }} />
                
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
                {isEditing ? (
                    <>
                        <Button
                            onClick={() => { setIsEditing(false); }}
                            sx={{
                                backgroundColor: "#0a3561",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "#08304f",  
                                },
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handleUpdate}
                            sx={{
                                backgroundColor: "#ff9800",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "#e68a00",  
                                },
                            }}
                        >
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <IconButton onClick={() => setIsEditing(true)} color="primary" aria-label="edit">
                            <EditIcon sx={{color: "#ff9800"}}/>
                        </IconButton>

                        <IconButton onClick={() => setIsDeleting(true)} color="primary" aria-label="edit">
                            <DeleteIcon sx={{color: "#0a3561"}}/>
                        </IconButton>

                        {/* Delete Module */}
                        <DeleteConfirmationModule open={isDeleting} onCancel={setIsDeleting} onDelete={onClose}/>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default UserEventModule;
