import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav style={{ padding: '1rem', backgroundColor: 'lightgray' }}>
            <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/manage-events">Manage Events</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;