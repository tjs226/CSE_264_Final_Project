import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import EventsManager from './pages/EventsManager.jsx';
import NavBar from './Components/NavBar.jsx';
import Login from './pages/Login.jsx';
import CreateUser from './pages/CreateUser.jsx';
import './App.css';

function App() {
  return (
    <Router>
      {/* Navigation (common to all pages...for now)*/}
      <NavBar />
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-events" element={<EventsManager />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
