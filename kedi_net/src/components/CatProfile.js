import '../styles/CatProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useState, useEffect } from 'react';
import { useAuth } from "../AuthContext";
import CatsProfilePopup from "../components/CatsProfilePopup";
import { loadCatImage } from '../utils/ImageLoader';

const CatProfile = ({ showHeartButton }) => {
    const { isLoggedIn } = useAuth();
    const { catId } = useParams();
    const [cat, setCat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [heartClicked, setHeartClicked] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/readCat?id=${catId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setCat(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [catId]);

    const handleHeartClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLoggedIn) {
            setHeartClicked(!heartClicked);
        } else {
            setShowLoginPrompt(true);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!cat) {
        return <div>No cat found</div>;
    }

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
                                        style={{ color: heartClicked ? 'black' : 'white', zIndex: 1 }}
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
                                    showThumbs={false}
                                    showIndicators={false}
                                    infiniteLoop={true}
                                    swipeable={true}
                                >
                                    {cat.imageNames.map((image, index) => {
                                        const imagePath = loadCatImage(image);
                                        console.log(`Loading image: ${image}, Path: ${imagePath}`);
                                        return (
                                            imagePath && (
                                                <div key={index}>
                                                    <img src={imagePath} alt={`Slide ${index + 1}`} style={{ height: '310px', width: 'auto' }} />
                                                </div>
                                            )
                                        );
                                    })}
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
                            <p className="box-text">{cat.about}</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid full-width-container mt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="smaller-box">
                                <h5 className="box-title">Characteristics</h5>
                                <p className="box-text">Gender: {cat.gender}</p>
                                <p className="box-text">Breed: {cat.breed}</p>
                                <p className="box-text">Age: {cat.age}</p>
                                <p className="box-text">Indoor Cat: {cat.isIndoorCat ? 'Yes' : 'No'}</p>
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
                                <p className="box-text">{cat.shelter}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CatsProfilePopup showLoginPrompt={showLoginPrompt} setShowLoginPrompt={setShowLoginPrompt} />
        </div>
    );
}

export default CatProfile;
