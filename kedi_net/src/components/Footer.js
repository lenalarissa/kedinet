import '../styles/Footer.css';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left">Contact: istanbul@kedi-net.com</div>
            <nav className="footer-right">
                <Link to="/admin" className="nav-link-footer">Admin Log In</Link>
            </nav>
        </footer>
    );
}

export default Footer;
