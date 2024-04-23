import './FavCats.css';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const EditCats = () => {

    // some mock cats as objects since there is no connection to the database yet
    const [cats, setCats] = useState([
        {
            id: 1,
            name: 'Fluffy',
            breed: 'Persian',
            gender: 'Male',
            region: 'Kadiköy',
            image: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'
        },
        {
            id: 2,
            name: 'Whiskers',
            breed: 'Siamese',
            gender: 'Female',
            region: 'Kadiköy',
            image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg'
        },
        {
            id: 3,
            name: 'Snowball',
            breed: 'Maine Coon',
            gender: 'Female',
            region: 'Beşiktaş',
            image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/rockcms/2022-08/220805-domestic-cat-mjf-1540-382ba2.jpg'
        },
    ]);

    // mock admin
    const admin = {shelterName: "Shelter Kadiköy"}

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [catToDelete, setCatToDelete] = useState(null);
    const handleXClick = (catId, e) => {
        // prevent this to be the link to the cats profile
        e.preventDefault();
        e.stopPropagation();
        setCatToDelete(catId);
        setShowConfirmation(true);
    };
    const handleDeleteConfirm = () => {
        const updatedCats = cats.filter(cat => cat.id !== catToDelete);
        setCats(updatedCats);
        setShowConfirmation(false);
    };

    const handleDeleteCancel = () => {
        setCatToDelete(null);
        setShowConfirmation(false);
    };


    return (
        <div className="fav-page">
            <div className="row">
                <div className="col-md-12">
                    <div className="fav-cats">
                        <div className="fav-cats-text">All cats available on the website from {admin.shelterName}:</div>
                    </div>
                    <Link to="/addCat" className="add-cat-button">Add Cat</Link>
                </div>
            </div>
            <div className="container mt-3">
                <div className="row">
                    {cats.map((cat, index) => (
                        <div className="col-md-3" key={index}>
                            <div className="cat-box">
                                <Link to={`/cat/${cat.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                    <div className="box-image position-relative">
                                        <img src={cat.image} alt="Cat Image"/>
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
                                    <p className="box-info">Breed: {cat.breed} | Gender: {cat.gender}</p>
                                    <p className="box-info">Region: {cat.region}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showConfirmation && (
                <div className="confirmation-popup">
                    <div className="confirmation-popup-content">
                        <p>Are you sure you want to delete this cat?</p>
                        <button className="confirmation-button" onClick={handleDeleteConfirm}>Yes</button>
                        <button className="confirmation-button" onClick={handleDeleteCancel}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditCats;