import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import logo from './logo.png';
import FilteringSection from './FilteringSection';
import SortingSection from './SortingSection';
import CatsGallery from './CatsGallery';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    // some mock cats as objects since there is no connection to the database yet
    const cats = [
        { id: 1, name: 'Fluffy', breed: 'Persian', gender: 'Male', region: 'Kadiköy', imageUrl: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg' },
        { id: 2, name: 'Whiskers', breed: 'Siamese', gender: 'Female', region: 'Kadiköy',  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg' },
        { id: 3, name: 'Snowball', breed: 'Maine Coon', gender: 'Female', region: 'Beşiktaş', imageUrl: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/rockcms/2022-08/220805-domestic-cat-mjf-1540-382ba2.jpg' },
        { id: 4, name: 'Mittens', breed: 'Ragdoll', gender: 'Male', region: 'Şişli', imageUrl: 'https://idsb.tmgrup.com.tr/ly/uploads/images/2021/09/08/thumbs/871x871/142774.jpg' },
        { id: 5, name: 'Simba', breed: 'Bengal', gender: 'Male', region: 'Üsküdar', imageUrl: 'https://www.cats.org.uk/media/13135/191108case015.jpg?width=500&height=333.3333333333333' },
        { id: 6, name: 'Luna', breed: 'Scottish Fold', gender: 'Female', region: 'Kadıköy', imageUrl: 'https://www.cats.org.uk/media/13134/190110case061.jpg?width=500&height=333.3333333333333' },
        { id: 7, name: 'Max', breed: 'Sphynx', gender: 'Male', region: 'Beyoğlu', imageUrl: 'https://www.cats.org.uk/media/13136/220325case013.jpg?width=500&height=333.49609375' }
    ];

    return (
        <div>
            <Navbar expand="lg" id="nav_bar">
                <Navbar.Brand href="#">
                    <img id="logo" src={logo} alt="Logo" />
                    <span className="title">Kedi-net Istanbul</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#" style={{ fontWeight: 'bold' }}>Search</Nav.Link>
                        <Nav.Link href="sign_up.html">Sign Up</Nav.Link>
                        <Nav.Link href="log_in.html">Log In</Nav.Link>
                        <Nav.Link href="help.html">Help</Nav.Link>
                        <Nav.Link href="fav_cats.html"><FontAwesomeIcon icon={faHeart} /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <FilteringSection />
            <SortingSection />
            <CatsGallery cats={cats} />
        </div>
    );
}

export default App;
