import {Dialog, DialogTitle, DialogContent, Typography, IconButton, Divider, Box, Stack, Button} from '@mui/material';
import {useState, useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { use } from 'react';

function EventModule({ open, onClose, event }) {
    const [hasRSVP, setHasRSVP] = useState(false);

    useEffect(() => {
        // go into localStore and see if they rsvp'd for that given event
    }, [event, open])

    const sendRsvp = () => {
        // make api call, set local storage
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
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={sendRsvp} sx={{ backgroundColor: '#0a3561', color: '#ffffff', '&:hover': {backgroundColor: '#092748'}}}>
                RSVP
            </Button>
        </Box>

      </DialogContent>
    </Dialog>
  );
}

export default EventModule;
