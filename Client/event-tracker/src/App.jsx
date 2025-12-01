import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home.jsx';
import EventsManager from './pages/EventsManager.jsx';
import NavBar from './Components/NavBar.jsx';
import Login from './pages/Login.jsx';
import CreateUser from './pages/CreateUser.jsx';
import Menu from './Components/Menu.jsx';

function App() {
  // state to hold if the side menu is open or closed 
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <>
      <Router>  
        <NavBar setMenuOpen={setMenuOpen}/> {/* setMenuOpen allows the nav bar to open the side menu too ! */}
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manage-events" element={<EventsManager />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
