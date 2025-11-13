import { Drawer } from '@mui/material';
import { Link } from 'react-router-dom';

function Menu({ menuOpen, setMenuOpen }) {
    
    return (
        <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)} slotProps={{ paper: { sx: { width: 250, bgcolor: '#0a3561', color: 'white' }}}}>
        
        </Drawer>
    );

}

export default Menu;