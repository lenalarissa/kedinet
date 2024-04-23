import './App.css';
import {Navbar, Nav} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import SearchPage from "./SearchPage";
import CatProfile from "./CatProfile";
import { useAuth } from './AuthContext';
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import React, { useState } from 'react';
import Help from "./Help";
import FavCats from "./FavCats";
import Admin from "./Admin";
import EditCats from "./EditCats";
import AddCat from "./AddCat";

function App() {
    const { isLoggedIn, logout } = useAuth();
    const [showSignUpPopup, setShowSignUpPopup] = useState(false);
    const [showFavCatsPopup, setShowFavCatsPopup] = useState(false);

    const handleSignUpClick = () => {
        if (isLoggedIn) {
            // If user is logged in, show the sign-up pop-up
            setShowSignUpPopup(true);
        }
    };

    const handleSignUpClose = () => {
        // Close the sign-up pop-up
        setShowSignUpPopup(false);
    };

    function handleFavCatsClick() {
        if (!isLoggedIn) {
            // If user is logged in, show the sign-up pop-up
            setShowFavCatsPopup(true);
        }
    }
    const handleFavCatsClose = () => {
        // Close the sign-up pop-up
        setShowFavCatsPopup(false);
    };

    return (
        <div>
            <Router>
                <Navbar expand="lg" id="nav_bar">
                    <Link to="/" className="navbar-brand">
                        <img id="logo" src={logo} alt="Logo"/>
                        <span className="title">Kedi-net Istanbul</span>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Link to="/" className="nav-link">Search</Link>
                            {isLoggedIn ? (
                                <span className="nav-link" style={{cursor: 'pointer'}} onClick={handleSignUpClick}>Sign Up</span>
                            ) : (
                                <Link to="/signUp" className="nav-link">Sign Up</Link>
                            )}
                            {isLoggedIn ? (
                                <span className="nav-link" style={{cursor: 'pointer'}} onClick={logout}>Log Out</span>
                            ) : (
                                <Link to="/login" className="nav-link">Log In</Link>
                            )}
                            <Link to="/help" className="nav-link">Help</Link>
                            {isLoggedIn ? (
                                <Link to="/favCats" className="nav-link"><FontAwesomeIcon icon={faHeart}/></Link>
                            ) : (
                                <span className="nav-link" style={{cursor: 'pointer'}}
                                      onClick={handleFavCatsClick}><FontAwesomeIcon icon={faHeart}/></span>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes>
                    <Route exact path="/" element={<SearchPage/>}/>
                    <Route path="/cat/:catId" element={<CatProfile/>}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                    <Route path="/login" element={<LogIn/>}/>
                    <Route path="/help" element={<Help/>}/>
                    <Route path="/favCats" element={<FavCats/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/editCats" element={<EditCats/>}/>
                    <Route path="/addCat" element={<AddCat/>}/>
                </Routes>
                <div className="above-footer">
                    <p></p>
                </div>
                <footer className="footer">
                    <div className="footer-left">Contact: istanbul@kedi-net.com</div>
                    <nav className="footer-right">
                        <Link to="/admin" className="nav-link">Admin Log In</Link>
                    </nav>
                </footer>
            </Router>
            {showSignUpPopup && (
                <div className="signup-popup">
                    <div className="popup-content">
                        <p>You are already logged in. Please log out to sign up for a new account.</p>
                        <button onClick={handleSignUpClose}>Close</button>
                    </div>
                </div>
            )}
            {showFavCatsPopup && (
                <div className="signup-popup">
                    <div className="popup-content">
                        <p>To see you favorite cats sign up or log in to your user account.</p>
                        <button onClick={handleFavCatsClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;