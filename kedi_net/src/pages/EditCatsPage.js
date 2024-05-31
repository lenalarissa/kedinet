import '../styles/FavCats.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import NavBarAdmin from "../components/NavBarAdmin";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup";
import { useAuth } from "../AuthContext";

const EditCatsPage = () => {
    const { admin } = useAuth(); // Use admin state here
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [catToDelete, setCatToDelete] = useState(null);

    useEffect(() => {
        console.log('Admin object:', admin); // Log the admin object
        const fetchCats = async () => {
            try {
                const response = await fetch(`http://localhost:8080/admin/cats?secretKey=${admin.secretKey}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setCats(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cats:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        if (admin) {
            fetchCats();
        }
    }, [admin]);

    const handleXClick = (catId, e) => {
        e.preventDefault();
        e.stopPropagation();
        setCatToDelete(catId);
        setShowConfirmation(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:8080/admin/deleteCat?secretKey=${admin.secretKey}&id=${catToDelete}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setCats(cats.filter(cat => cat.id !== catToDelete));
                setShowConfirmation(false);
                setCatToDelete(null);
            } else {
                const errorText = await response.text();
                throw new Error(`Failed to delete cat: ${response.statusText}, ${errorText}`);
            }
        } catch (error) {
            console.error('Error deleting cat:', error);
            setError(error.message);
        }
    };

    const handleDeleteCancel = () => {
        setCatToDelete(null);
        setShowConfirmation(false);
    };

    const getImagePath = (imageName) => {
        try {
            return require(`../assets/cat_images/${imageName}`);
        } catch (err) {
            console.error('Error loading image:', imageName, err);
            return null;
        }
    };

    const formatText = (text) => {
        if (!text) return ''; // return an empty string if text is undefined or null
        return text.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <NavBarAdmin />
            <div className="fav-page">
                <div className="row">
                    <div className="col-md-12">
                        <div className="fav-cats">
                            <div className="fav-cats-text">All cats from {admin ? admin.shelterName : ''}:</div>
                        </div>
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="row">
                        {cats.map((cat, index) => (
                            <div className="col-md-3" key={index}>
                                <div className="cat-box">
                                    <Link to={`/editCat/${cat.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="box-image position-relative">
                                            <img
                                                src={cat.imageNames && cat.imageNames.length > 0 ? getImagePath(cat.imageNames[0]) : null}
                                                alt="Cat Image"
                                            />
                                            <button
                                                type="button"
                                                className="btn x-button"
                                                onClick={(e) => handleXClick(cat.id, e)}
                                            >
                                                <FontAwesomeIcon icon={faTimes} size="1x" />
                                            </button>
                                        </div>
                                        <div className="box-details" style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        }}>
                                            <div className="box-name">{cat.name}</div>
                                        </div>
                                        <p className="box-info">Breed: {formatText(cat.breed)}</p>
                                        <p className="box-info">Gender: {formatText(cat.gender)}</p>
                                        <p className="box-info">Age: {cat.age}</p>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <DeleteConfirmationPopup
                    showConfirmation={showConfirmation}
                    handleDeleteConfirm={handleDeleteConfirm}
                    handleDeleteCancel={handleDeleteCancel}
                />
            </div>
        </div>
    );
};

export default EditCatsPage;
