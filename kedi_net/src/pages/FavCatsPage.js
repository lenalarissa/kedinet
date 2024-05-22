import '../styles/FavCats.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAuth } from "../AuthContext";
import { loadCatImage } from '../utils/ImageLoader'; // Assuming you have a utility function to load images

const FavCatsPage = () => {
    const { user } = useAuth();
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:8080/user/favorites?secretKey=${user.secretKey}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setCats(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching favorite cats:', error);
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleXClick = (catId, e) => {
        e.preventDefault();
        e.stopPropagation();
        fetch(`http://localhost:8080/user/removeFavorite?secretKey=${user.secretKey}&catId=${catId}`, {
            method: 'POST',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const updatedCats = cats.filter(cat => cat.id !== catId);
                setCats(updatedCats);
            })
            .catch(error => {
                console.error('Error removing favorite cat:', error);
            });
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

    return (
        <div className="frame">
            <NavBar />
            <div className="fav-page">
                <div className="row">
                    <div className="col-md-12">
                        <div className="fav-cats">
                            <div className="fav-cats-text">Your favorite cats:</div>
                        </div>
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="row">
                        {cats.map((cat, index) => (
                            <div className="col-md-3" key={index}>
                                <div className="cat-box-fav">
                                    <Link to={`/catUser/${cat.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                        <div className="box-image position-relative">
                                            <img src={loadCatImage(cat.imageNames[0])} alt="Cat Image"/>
                                            <button
                                                type="button"
                                                className="btn x-button"
                                                onClick={(e) => handleXClick(cat.id, e)}
                                            >
                                                <FontAwesomeIcon icon={faTimes} size="1x"/>
                                            </button>
                                        </div>
                                        <div className="box-details" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}>
                                            <div className="box-name">{cat.name} </div>
                                        </div>
                                        <p className="box-info">Breed: {formatText(cat.breed)}</p>
                                        <p className="box-info">Gender: {formatText(cat.gender)}</p>
                                        <p className="box-info">Age: {cat.age}</p>
                                        <p className="box-info">Region: {formatText(cat.shelter.region)}</p>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default FavCatsPage;
