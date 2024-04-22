import './App.css';
import {Navbar, Nav} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SearchPage from "./SearchPage";


function App() {

    return (
        <div>
            <Navbar expand="lg" id="nav_bar">
                <Navbar.Brand href="#">
                    <img id="logo" src={logo} alt="Logo"/>
                    <span className="title">Kedi-net Istanbul</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#" style={{fontWeight: 'bold'}}>Search</Nav.Link>
                        <Nav.Link href="/sign_up">Sign Up</Nav.Link>
                        <Nav.Link href="/log_in">Log In</Nav.Link>
                        <Nav.Link href="/help">Help</Nav.Link>
                        <Nav.Link href="/fav_cats"><FontAwesomeIcon icon={faHeart}/></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/*<SearchPage/>*/}
            <Router>
                <Routes>
                    <Route exact path="/" element={<SearchPage/>}>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
