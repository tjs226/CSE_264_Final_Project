import CloseIcon from '@mui/icons-material/Close';
import {Dialog, DialogTitle, DialogContent, Typography, IconButton, Divider, Box, Stack, Button, TextField} from '@mui/material';
import {useState, useEffect} from 'react';

const API_URL = 'http://localhost:3000';

function AddEventModule({open, onClose }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (open) {
            setName("");
            setDate("");
            setStartTime("");
            setEndTime("");
            setLocation("");
            setDescription("");
        }
    }, [open]); // everytime module opens 

    // api call to create new event
    const handleSubmit = async () => {
        try {
            const res = await fetch(`${API_URL}/events`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name,
                    date,
                    start_time: startTime,
                    end_time: endTime,
                    location,
                    description
                })
            });

            const data = await res.json();

            if (res.ok) {
                onClose(false); // close the module
            } else {
                console.log("Error Submitting");
            }

        } catch (err) {
            console.log(err);
            onClose(false);
        }
    };

    /* helper function to check if the user input is valid (sanitize)*/
    const isFormValid = () => {
        return (
            name.trim() !== "" &&
            date.trim() !== "" &&
            startTime.trim() !== "" &&
            endTime.trim() !== "" &&
            location.trim() !== "" &&
            description.trim() !== ""
        );
    };


    return (
        <>
            <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth slotProps={{ paper: { sx: {borderRadius: 3, p: 2, bgcolor: '#fefefe',},},}}>
      
                {/* Header */}
                <DialogTitle sx={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',pb: 0,}}>  
                
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#0a3561'}}>
                        Create Event
                    </Typography>  

                    <IconButton onClick={() => onClose(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {/* add feilds*/}
                <DialogContent sx={{ pt: 1 }}>
                    <Divider sx={{ mb: 2 }} />

                    <Box component="form"  sx={{ mt: 1 }}>
                        <Stack spacing={2}>

                            <TextField
                                label="Event Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <TextField
                                label="Date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                required
                            />

                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Start Time"
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />

                                <TextField
                                    label="End Time"
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Stack>
            
                            <TextField
                                label="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />

                            <TextField
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                multiline
                                rows={3}
                            />

            
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                                <Button 
                                    type="submit" 
                                    variant="contained" sx={{ ml: 2 }} 
                                    disabled={!isFormValid()}
                                    onClick={handleSubmit}
                                >
                                    Create
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );

}

export default AddEventModule;