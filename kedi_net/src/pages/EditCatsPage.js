import '../styles/FavCats.css';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import NavBarAdmin from "../components/NavBarAdmin";
import matar1 from "../assets/cat_img/matar1.jpg";
import cat2 from "../assets/cat_img/2.jpeg";
import cat3 from "../assets/cat_img/3.jpeg";
import cat4 from "../assets/cat_img/4.jpeg";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup";

const EditCatsPage = () => {

    // some mock cats as objects since there is no connection to the database yet
    const [cats, setCats] = useState([{
        id: 1, name: 'Matar', breed: 'Arabian Mau', gender: 'Female', region: 'Kadiköy', image: matar1
    }, {
        id: 2, name: 'Whiskers', breed: 'Siamese', gender: 'Female', region: 'Kadiköy', image: cat2
    }, {
        id: 3, name: 'Snowball', breed: 'Maine Coon', gender: 'Female', region: 'Beşiktaş', image: cat3
    }, {
        id: 4, name: 'Mittens', breed: 'Ragdoll', gender: 'Male', region: 'Şişli', image: cat4
    }]);

    // mock admin (can only edit the cats from their shelter
    const admin = {shelterName: "Shelter Kadiköy"}

    // for deleting it needs a confirmation
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

    return (<div>
            <NavBarAdmin/>
            <div className="fav-page">
                <div className="row">
                    <div className="col-md-12">
                        <div className="fav-cats">
                            <div className="fav-cats-text">All cats available on the website from {admin.shelterName}:
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="row">
                        {cats.map((cat, index) => (<div className="col-md-3" key={index}>
                                <div className="cat-box">
                                    <Link to={`/catAdmin/${cat.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
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
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        }}>
                                            <div className="box-name">{cat.name} </div>
                                        </div>
                                        <p className="box-info">Breed: {cat.breed} | Gender: {cat.gender}</p>
                                        <p className="box-info">Region: {cat.region}</p>
                                    </Link>
                                </div>
                            </div>))}
                    </div>
                </div>
                <DeleteConfirmationPopup
                    showConfirmation={showConfirmation}
                    handleDeleteConfirm={handleDeleteConfirm}
                    handleDeleteCancel={handleDeleteCancel}
                />

            </div>
        </div>);
};

export default EditCatsPage;