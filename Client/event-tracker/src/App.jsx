import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import EventsManager from './pages/EventsManager.jsx';
import './App.css';

function App() {
  return (
    <Router>
      {/* Navigation */}
      <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/manage-events">Manage Events</Link></li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-events" element={<EventsManager />} />
      </Routes>
    </Router>
  );
}

export default App;
