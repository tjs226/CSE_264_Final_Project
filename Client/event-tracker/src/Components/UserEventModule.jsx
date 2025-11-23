import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Divider, Box, Stack, TextField, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

function UserEventModule({ open, onClose, event }) {
    const [isEditing, setIsEditing] = useState(false); // toggle from edit mode

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
    }, [event, isEditing]);

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

    return (
        <Dialog open={open} onClose={() => { setIsEditing(false); onClose(); }} maxWidth="sm" fullWidth
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
                        <Typography><strong>Start:</strong> {startTime}</Typography>
                        <Typography><strong>End:</strong> {endTime}</Typography>
                        <Typography><strong>Location:</strong> {location}</Typography>
                        <Typography sx={{ whiteSpace: 'pre-line' }}><strong>Description:</strong> {description}</Typography>
                        <Typography><strong>RSVP's:</strong> {rsvp}</Typography>
                    </Stack>
                )}

            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center' }}>
                {isEditing ? (
                    <>
                        <Button onClick={() => { setIsEditing(false); }}>Cancel</Button>
                        <Button variant="contained" onClick={handleUpdate}>Save</Button>
                    </>
                ) : (
                    <>
                        <IconButton onClick={() => setIsEditing(true)} color="primary" aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default UserEventModule;
