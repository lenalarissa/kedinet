import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import breeds from '../constants/Breeds';
import { mapBreedFromBackend } from '../constants/MapBreedFromBackend';
import { mapCanLiveWithFromBackend } from '../constants/MapCanLiveWithFromBackend';
import '../styles/AddCat.css';
import { loadCatImage } from '../utils/ImageLoader';
import NavBarAdmin from "../components/NavBarAdmin";
import { useAuth } from '../AuthContext';

const canLiveWithOptions = ["Calm people only", "Children", "Dogs", "Cats"];
const colors = ["Black", "White", "Grey", "Brown", "Orange"];

const EditCatFormPage = () => {
    const { catId } = useParams();
    const navigate = useNavigate();
    const { admin } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        breed: '',
        age: 0,
        indoorCat: false,
        size: '',
        coatLength: '',
        canLiveWith: '',
        disease: '',
        about: '',
        images: [],
        color: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const response = await fetch(`http://localhost:8080/cat/${catId}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const catData = await response.json();
                const images = (catData.imageNames || []).map(imageName => ({
                    name: imageName,
                    url: loadCatImage(imageName),
                }));
                setFormData({
                    name: catData.name,
                    gender: catData.gender.toLowerCase(),
                    breed: mapBreedFromBackend(catData.breed),
                    age: catData.age,
                    indoorCat: catData.isIndoorCat,
                    size: catData.size.toLowerCase(),
                    coatLength: catData.coatLength.toLowerCase(),
                    canLiveWith: mapCanLiveWithFromBackend(catData.canLiveWith),
                    disease: catData.disease || '',
                    about: catData.about || '',
                    images: images,
                    color: catData.color.toLowerCase()
                });
                setImagePreviews(images.map(img => img.url));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cat:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCat();
    }, [catId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const combinedFiles = [...formData.images, ...newFiles];
        if (combinedFiles.length > 5) {
            alert('You can upload a maximum of 5 images.');
        } else {
            const newImagePreviews = newFiles.map(file => URL.createObjectURL(file));
            setFormData(prevState => ({
                ...prevState,
                images: combinedFiles
            }));
            setImagePreviews(prevState => [...prevState, ...newImagePreviews]);
        }
    };

    const handleImageDelete = async (index) => {
        const imageToDelete = formData.images[index];
        if (!(imageToDelete instanceof File)) {
            try {
                const response = await fetch(`http://localhost:8080/admin/deleteImageByName/${imageToDelete.name}?secretKey=${admin.secretKey}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error deleting image:', error);
                setError(error.message);
                return;
            }
        }

        if (imagePreviews.length > 1) {
            setImagePreviews(prevState => prevState.filter((_, i) => i !== index));
            setFormData(prevState => ({
                ...prevState,
                images: prevState.images.filter((_, i) => i !== index)
            }));
        } else {
            alert('There must be at least one image.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('secretKey', admin.secretKey);
        Object.keys(formData).forEach(key => {
            if (key === 'images') {
                formData[key].forEach(image => {
                    if (image instanceof File) {
                        data.append('images', image);
                    } else {
                        data.append('existingImages', image.name);
                    }
                });
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await fetch(`http://localhost:8080/admin/updateCat/${catId}`, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            navigate('/editCats');
        } catch (error) {
            console.error('Error submitting form:', error);
            setError(error.message);
        }
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
            <div className="add-cat-form">
                <h2>Edit Cat</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group-add">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            maxLength={30}
                            pattern="[A-Za-z\s]+"
                            title="Name must only contain alphabetical characters"
                            required
                        />
                    </div>
                    <div className="form-group-add">
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="form-group-add">
                        <label>Breed:</label>
                        <select
                            name="breed"
                            value={formData.breed}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Breed</option>
                            {breeds.map((breed, index) => (
                                <option key={index} value={breed}>{breed}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group-add">
                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            min={0}
                            max={20}
                            required
                        />
                    </div>
                    <div className="form-group-add">
                        <div className="form-group-add-indoor">
                            <label>Indoor Cat:</label>
                            <input
                                type="checkbox"
                                name="indoorCat"
                                checked={formData.indoorCat}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                    </div>
                    <div className="form-group-add">
                        <label>Size:</label>
                        <select
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="big">Big</option>
                        </select>
                    </div>
                    <div className="form-group-add">
                        <label>Coat Length:</label>
                        <select
                            name="coatLength"
                            value={formData.coatLength}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Coat Length</option>
                            <option value="short">Short</option>
                            <option value="medium">Medium</option>
                            <option value="long">Long</option>
                        </select>
                    </div>
                    <div className="form-group-add">
                        <label>Can Live With:</label>
                        <select
                            name="canLiveWith"
                            value={formData.canLiveWith}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select an Option</option>
                            {canLiveWithOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group-add">
                        <label>Color:</label>
                        <select
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Color</option>
                            {colors.map((color, index) => (
                                <option key={index} value={color.toLowerCase()}>{color}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group-add">
                        <label>Disease:</label>
                        <input
                            type="text"
                            name="disease"
                            value={formData.disease}
                            onChange={handleChange}
                            maxLength={50}
                        />
                    </div>
                    <div className="form-group-add">
                        <label>Information Text:</label>
                        <textarea
                            name="about"
                            value={formData.about}
                            onChange={handleChange}
                            maxLength={2000}
                            rows={10}
                            required
                        />
                    </div>
                    <div className="form-group-add">
                        <label>Images (max 5):</label>
                        <input
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        <div className="image-previews">
                            {formData.images.map((image, index) => (
                                <div key={index} className="image-preview-box">
                                    {imagePreviews[index] ? (
                                        <div>
                                            <img src={imagePreviews[index]} alt={`Preview ${index}`} className="image-preview" />
                                            <button type="button" className="delete-image-button" onClick={() => handleImageDelete(index)}>X</button>
                                        </div>
                                    ) : (
                                        <div className="empty-image-box">No Image</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default EditCatFormPage;
