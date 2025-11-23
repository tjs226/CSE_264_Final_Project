import { Typography, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function NavBar({ setMenuOpen }) {
  // setMenuOpen controlls if the menu appears (from parrent)

  return (
    <Box sx={{position: 'relative',bgcolor: '#0a3561',width: '100%',height: '100px',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
      
      <Link to='/' style={{ textDecoration: "none" }}>
        <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold'}}>Bethlehem Events</Typography>
      </Link>

      {/* Menu Icon */}
      <IconButton sx={{color: 'white',position: 'absolute',right: 20,}} onClick={() => setMenuOpen(true)}>
        <MenuIcon sx={{ fontSize: 40 }}/>
      </IconButton>

    </Box>
  );
}

export default NavBar;