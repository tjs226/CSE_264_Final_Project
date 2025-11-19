import {Dialog, DialogTitle, DialogContent, Typography, IconButton, Divider, Box, Stack, Button} from '@mui/material';
import {useState, useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';

const API_URL = 'http://localhost:3000';

function EventModule({ open, onClose, event }) {
  const [canRSVP, setCanRSVP] = useState(true);

  // go into localStore and see if they rsvp'd for that given event
  useEffect(() => {
    if(event && open){
      const inStorage = localStorage.getItem(`rsvp_event_${event.id}`);
      if (inStorage === "true"){
        setCanRSVP(false);
      } else {
        setCanRSVP(true);
      }
    }
  }, [event, open]) // run this every time event and/or open chnage

  const sendRsvp = async () => {
    try{
      const response = await fetch(`${API_URL}/events/${event.id}/rsvp`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (response.ok){
        setCanRSVP(false);
        localStorage.setItem(`rsvp_event_${event.id}`, "true"); // go into local storage and mark that we have rsvp'd to the event
      }else {
        console.log("Failed to RSVP")
      }
      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth slotProps={{ paper: { sx: {borderRadius: 3, p: 2, bgcolor: '#fefefe',},},}}>
      
      {/* Header */}
      <DialogTitle sx={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',pb: 0,}}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#0a3561' }}>
          {event.name || ""}
        </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Divider sx={{ mb: 2 }} />

        {/* Event Details */}
        <Stack spacing={2}>
          
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">Date</Typography>
            <Typography variant="body1">{event.date || ""}</Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 4 }}>
            
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">Start Time</Typography>
              <Typography variant="body1">{event.start_time || ""}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">End Time</Typography>
              <Typography variant="body1">{event.end_time || ""}</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">Location</Typography>
            <Typography variant="body1">{event.location || ""}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">Description</Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{event.description || ""}</Typography>
          </Box>

        </Stack>


        {/* RSVP Button */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', flexDirection: "column", alignContent: "center", alignItems: "center" }}>
            <Button variant="contained" onClick={sendRsvp} disabled={canRSVP === false} sx={{ backgroundColor: '#0a3561', color: '#ffffff', '&:hover': {backgroundColor: '#092748'}}}>
              RSVP
            </Button>
            {(canRSVP === false) &&
              <Typography sx={{color: "red"}}>You Already RSVP'd to this Event !!!</Typography>
            }
        </Box>

      </DialogContent>
    </Dialog>
  );
}

export default EventModule;
