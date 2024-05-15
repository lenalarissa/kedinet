import '../styles/CatProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useParams} from 'react-router-dom';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {useState} from 'react';
import {useAuth} from "../AuthContext";
import CatsProfilePopup from "../components/CatsProfilePopup";
import cats from "../constants/Cats";

const CatProfile = ({showHeartButton}) => {
    const {isLoggedIn} = useAuth();

    const {catId} = useParams();
    const cat = cats.find(cat => cat.id === parseInt(catId));

    const [heartClicked, setHeartClicked] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const handleHeartClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLoggedIn) {
            setHeartClicked(!heartClicked);
        } else {
            setShowLoginPrompt(true);
        }
    };

    return (
        <div className="container-fluid full-width-container mt-3">
            <div className="row">
                <div className="col-md-12">
                    <div className="cat-name-box">
                        <div className="box-name-text">
                            <row>
                                {cat.name}
                                {showHeartButton && (
                                    <button
                                        type="button"
                                        className="profile-heart-button"
                                        style={{color: heartClicked ? 'black' : 'white', zIndex: 1}}
                                        onClick={handleHeartClick}
                                    >
                                        <i className={heartClicked ? 'fas fa-heart' : 'far fa-heart'}></i>
                                    </button>
                                )}
                            </row>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="image-slider-box">
                                <Carousel
                                    showThumbs={false} // no thumbnail overview
                                    showIndicators={false}
                                    infiniteLoop={true}
                                    swipeable={true}
                                >
                                    {cat.images.map((image, index) => <div key={index}>
                                        <img src={image} alt={`Slide ${index + 1}`}
                                             style={{height: '310px', width: "auto"}}/>
                                    </div>)}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid full-width-container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="about-box">
                            <h5 className="box-title">About</h5>
                            <p className="box-text"></p>
                            <p className="box-text">{cat.about}</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid full-width-container mt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="smaller-box">
                                <h5 className="box-title">Characteristics</h5>
                                <p className="box-text"></p>
                                <p className="box-text">Gender: {cat.gender}</p>
                                <p className="box-text">Breed: {cat.breed}</p>
                                <p className="box-text">Age: {cat.age}</p>
                                <p className="box-text">Indoor Cat: {cat.indoorCat}</p>
                                <p className="box-text">Color: {cat.color}</p>
                                <p className="box-text">Size: {cat.size}</p>
                                <p className="box-text">Coat Length: {cat.coatLength}</p>
                                <p className="box-text">Can live with: {cat.canLiveWith}</p>
                                <p className="box-text">Disease: {cat.disease}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="smaller-box">
                                <h5 className="box-title">Shelter</h5>
                                <p className="box-text"></p>
                                <p className="box-text">{cat.shelter.name}</p>
                                <p className="box-text">Address: {cat.shelter.address}</p>
                                <p className="box-text">Website: {cat.shelter.website}</p>
                                <p className="box-text">e-mail: {cat.shelter.email}</p>
                                <p className="box-text">Phone: {cat.shelter.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CatsProfilePopup showLoginPrompt={showLoginPrompt} setShowLoginPrompt={setShowLoginPrompt}/>
        </div>
    );
}

export default CatProfile;