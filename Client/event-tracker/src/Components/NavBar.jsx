import { Typography, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function NavBar({ setMenuOpen }) {
  return (
    <Box sx={{position: 'relative',bgcolor: '#0a3561',width: '100%',height: '64px',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
      
      <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>Bethlehem Events</Typography>

      {/* Menu Icon */}
      <IconButton sx={{color: 'white',position: 'absolute',right: 20,}} onClick={() => setMenuOpen(true)}>
        <MenuIcon />
      </IconButton>

    </Box>
  );
}

export default NavBar;