import '../styles/CatProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useParams} from 'react-router-dom';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {useState, useEffect} from 'react';
import {useAuth} from "../AuthContext";
import CatsProfilePopup from "../components/CatsProfilePopup";
import {loadCatImage} from '../utils/ImageLoader';

const CatProfile = ({showHeartButton}) => {
    const {isLoggedIn, user} = useAuth();
    const {catId} = useParams();
    const [cat, setCat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState(new Set());
    const [heartClicked, setHeartClicked] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    useEffect(() => {
        const fetchCatData = async () => {
            try {
                const catResponse = await fetch(`http://localhost:8080/readCat?id=${catId}`);
                if (!catResponse.ok) {
                    throw new Error(`Network response was not ok: ${catResponse.statusText}`);
                }
                const catData = await catResponse.json();
                setCat(catData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCatData();
    }, [catId]);

    useEffect(() => {
        const fetchFavorites = async (secretKey) => {
            try {
                const response = await fetch(`http://localhost:8080/user/favorites?secretKey=${secretKey}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const favoriteCatIds = new Set(data.map(cat => cat.id));
                setFavorites(favoriteCatIds);
                setHeartClicked(favoriteCatIds.has(Number(catId))); // Set initial heartClicked state
                console.log('Favorite cat IDs:', favoriteCatIds); // Debugging line
                console.log('Current cat ID:', catId); // Debugging line
                console.log('Is current cat in favorites:', favoriteCatIds.has(Number(catId))); // Debugging line
            } catch (error) {
                console.error('Error fetching favorite cats:', error);
            }
        };

        if (isLoggedIn && user && user.secretKey) {
            fetchFavorites(user.secretKey);
        }
    }, [isLoggedIn, user, catId]);

    const handleHeartClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoggedIn && user) {
            const isFavorite = favorites.has(Number(catId));
            const url = new URL(isFavorite ? "http://localhost:8080/user/removeFavorite" : "http://localhost:8080/user/addFavorite");
            url.searchParams.append("secretKey", user.secretKey);
            url.searchParams.append("catId", catId);

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    setFavorites(prev => {
                        const updatedFavorites = new Set(prev);
                        if (isFavorite) {
                            updatedFavorites.delete(Number(catId));
                        } else {
                            updatedFavorites.add(Number(catId));
                        }
                        return updatedFavorites;
                    });
                    setHeartClicked(!isFavorite);
                } else {
                    console.error(`Failed to ${isFavorite ? 'remove' : 'add'} favorite`);
                }
            } catch (error) {
                console.error(`Error ${isFavorite ? 'removing' : 'adding'} favorite:`, error);
            }
        } else {
            setShowLoginPrompt(true);
        }
    };

    const formatText = (text) => {
        return text.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
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
                                    showThumbs={false}
                                    showIndicators={true}
                                    infiniteLoop={true}
                                    swipeable={true}
                                >
                                    {cat.imageNames.map((image, index) => {
                                        const imagePath = loadCatImage(image);
                                        console.log(`Loading image: ${image}, Path: ${imagePath}`);
                                        return (
                                            imagePath && (
                                                <div key={index}>
                                                    <img src={imagePath} alt={`Slide ${index + 1}`}
                                                         style={{height: '310px', width: 'auto'}}/>
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
                                <p className="box-text">Gender: {formatText(cat.gender)}</p>
                                <p className="box-text">Breed: {cat.breed.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}</p>
                                <p className="box-text">Age: {cat.age}</p>
                                <p className="box-text">Indoor Cat: {cat.isIndoorCat ? 'Yes' : 'No'}</p>
                                <p className="box-text">Color: {formatText(cat.color)}</p>
                                <p className="box-text">Size: {formatText(cat.size)}</p>
                                <p className="box-text">Coat Length: {formatText(cat.coatLength)}</p>
                                <p className="box-text">Can live with: {formatText(cat.canLiveWith)}</p>
                                <p className="box-text">Disease: {cat.disease ? formatText(cat.disease) : 'None'}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="smaller-box">
                                <h5 className="box-title">Shelter</h5>
                                {cat.shelter && (
                                    <>
                                        <p className="box-text">Name: {cat.shelter.name}</p>
                                        <p className="box-text">Region: {formatText(cat.shelter.region)}</p>
                                        <p className="box-text">Address: {cat.shelter.address}</p>
                                        <p className="box-text">
                                            Website: <a href={cat.shelter.website} target="_blank"
                                                        rel="noopener noreferrer">{cat.shelter.website}</a>
                                        </p>
                                        <p className="box-text">E-mail: {cat.shelter.email}</p>
                                        <p className="box-text">Phone: {cat.shelter.phone}</p>
                                    </>
                                )}
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
