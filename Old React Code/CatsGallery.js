import './CatsGallery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const CatGallery = ({ cats }) => {
    const handleHeartClick = (catId) => {
        // would save the cat to a list of favourites
    };

    return (
        <div className="container mt-3">
            <div className="row">
                {cats.map((cat, index) => (
                    <div className="col-md-3" key={index}>
                        <div className="box">
                            {/*<Link to={`/cat/${cat.id}`}>*/}
                            <div className="box-image position-relative">
                                {/* Heart-shaped button */}
                                <button type="button" className="btn heart-button position-absolute top-0 start-0"
                                        style={{color: 'black', zIndex: 1}} onClick={() => handleHeartClick(cat)}>
                                    <FontAwesomeIcon icon={faHeart} size="1x"/>
                                </button>
                                {/* Image */}
                                <img src={cat.imageUrl} alt="Cat Image"/>
                            </div>
                            <div className="box-details">
                            <h5 className="box-name">{cat.name}</h5>
                                <p className="box-info">Breed: {cat.breed} | Gender: {cat.gender}</p>
                                <p className="box-info">Region: {cat.region}</p>
                            </div>
                            {/*</Link>*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CatGallery;
