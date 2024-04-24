import '../styles/CatProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavBarAdmin from "../components/NavBarAdmin";
import CatProfile from "../components/CatProfile";

const CatProfileForUserPage = () => {
    return (
        <div className="frame">
            <NavBarAdmin/>
            <CatProfile showHeartButton={false}/>
        </div>
    );
}

export default CatProfileForUserPage;
