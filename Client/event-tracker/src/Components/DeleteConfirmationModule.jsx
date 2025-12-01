import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const API_URL = 'http://localhost:3000';

function DeleteConfirmationModule({ open, onCancel, onDelete, eventId, eventName }) {
    // open - condition to open the module
    // onCancel - function to close the delete confirmation module
    // onDelete - function to close the parent module and return to the management page
    // eventId - the Id of the event to be deleted 
    // eventName - the name of the event to be deleted


    // api call to delete an event
    const handleDelete = async () => {
        try {
            const res = await fetch(`${API_URL}/user/${eventId}`, {
                method: "DELETE", 
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });

            if(!res.ok){
                console.log("Error Deleting Event");
                alert("Failed to delete event")
            }

        } catch (err) {
            console.log(err);
            alert("Failed to delete event")
        }

        onDelete(); // closes delete confirmation module
        onCancel(false); // closes event module
    };

    return (
        <Dialog open={open} onClose={() => onCancel(false)} maxWidth="xs" fullWidth>
            <DialogTitle>Are you sure you want to delete '{eventName}' event?</DialogTitle>
            <DialogActions>
                <Button onClick={() => onCancel(false)}>Cancel</Button>
                <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}


export default DeleteConfirmationModule;