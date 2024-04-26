import {Link, useNavigate} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import {useAuth} from '../AuthContext';
import logo from '../assets/logo.png';

const NavBarAdmin = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();

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
                <img id="logo" src={logo} alt="Logo"/>
                <span className="title">
                        Kedi-net Istanbul <span className="admin">Admin</span>
                    </span>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/editCats" className="nav-link">Edit Cats</Link>
                        <Link to="/addCat" className="nav-link">Add Cat</Link>
                        <span className="nav-link" style={{cursor: 'pointer'}} onClick={handleLogout}>Log Out</span>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBarAdmin;
