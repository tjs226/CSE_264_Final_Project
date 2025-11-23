import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const API_URL = 'http://localhost:3000';

function DeleteConfirmationModule({ open, onCancel, onDelete, eventId }) {

    const handleDelete = async () => {
        // api call

        onDelete();
        onCancel(false);
    };

    return (
        <Dialog open={open} onClose={() => onCancel(false)} maxWidth="xs" fullWidth>
            <DialogTitle>Confirm</DialogTitle>
            <DialogActions>
                <Button onClick={() => onCancel(false)}>Cancel</Button>
                <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}


export default DeleteConfirmationModule;