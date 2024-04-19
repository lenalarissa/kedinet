import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import logo from './logo.png';
import FilteringSection from './FilteringSection'; // Import the FilteringSection component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div>
            <Navbar expand="lg" id="nav_bar">
                <Navbar.Brand href="kedi_net.html">
                    <img id="logo" src={logo} alt="Logo" />
                    <span className="title">Kedi-net Istanbul</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="kedi_net.html">Search</Nav.Link>
                        <Nav.Link href="sign_up.html">Sign Up</Nav.Link>
                        <Nav.Link href="log_in.html">Log In</Nav.Link>
                        <Nav.Link href="help.html">Help</Nav.Link>
                        <Nav.Link href="fav_cats.html"><FontAwesomeIcon icon={faHeart} /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <FilteringSection /> {/* Include the FilteringSection component */}
        </div>
    );
}

export default App;

