import '../styles/NavBar.css'
import {Navbar, Nav} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
//import SignUpPopup from "./SignUpPopup";
import FavCatsPopup from "./FavCatsPopup";
import {useAuth} from '../AuthContext';


const NavBar = () => {
    const navigate = useNavigate();
    const {isLoggedIn, logout} = useAuth();

    // Fav Cats Pop-up
    const [showFavCatsPopup, setShowFavCatsPopup] = useState(false);

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


    /*// Sign Up Pop-up
    const [showSignUpPopup, setShowSignUpPopup] = useState(false);
    const handleSignUpClick = () => {
        if (isLoggedIn) {
            setShowSignUpPopup(true);
        }
    };
    const handleSignUpClose = () => {
        // Close the sign-up pop-up
        setShowSignUpPopup(false);
    };*/


    // Log Out
    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            logout();
            navigate('/');
        }
    };


    return (
        <div>
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
                            /*<span className="nav-link" style={{cursor: 'pointer'}}
                                  onClick={handleSignUpClick}>Sign Up</span>*/
                            <Link to="/account" className="nav-link">Account</Link>
                        ) : (
                            <Link to="/signUp" className="nav-link">Sign Up</Link>
                        )}
                        {isLoggedIn ? (
                            <span className="nav-link" style={{cursor: 'pointer'}} onClick={handleLogout}>Log Out</span>
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
            {/*{showSignUpPopup && <SignUpPopup handleClose={handleSignUpClose}/>}*/}
            {showFavCatsPopup && <FavCatsPopup handleClose={handleFavCatsClose}/>}
        </div>
    );
}

export default NavBar;
