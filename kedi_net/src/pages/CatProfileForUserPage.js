import '../styles/CatProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CatProfile from "../components/CatProfile";

const CatProfileForUserPage = () => {
    return (
        <div className="frame">
            <NavBar/>
            <CatProfile showHeartButton={true}/>
            <Footer/>
        </div>
    );
}

export default CatProfileForUserPage;
