import React, { useState } from 'react';
import '../styles/AddCat.css';
import { useNavigate } from 'react-router-dom';
import NavBarAdmin from "../components/NavBarAdmin";
import breeds from '../constants/Breeds';

const AddCatPage = () => {
    const navigate = useNavigate();

    const colors = ["Black", "White", "Grey", "Brown", "Orange"];

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        breed: '',
        age: '',
        indoorCat: '',
        size: '',
        coatLength: '',
        canLiveWith: '',
        disease: '',
        information: '',
        images: [],
        color: ''
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const canLiveWithOptions = ["Calm people only", "Children", "Dogs", "Cats"];

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
            [name]: checked ? 'yes' : 'no'
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

    const handleImageDelete = (index) => {
        setImagePreviews(prevState => prevState.filter((_, i) => i !== index));
        setFormData(prevState => ({
            ...prevState,
            images: prevState.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'images') {
                formData[key].forEach(image => {
                    data.append('images', image);
                });
            } else {
                data.append(key, formData[key]);
            }
        });
        data.append('secretKey', '78ij9012-34kl-56mn-7890-opqr123456st');

        try {
            const response = await fetch('http://localhost:8080/admin/addCat', {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            navigate('/editCats');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <NavBarAdmin />
            <div className="add-cat-form">
                <h2>Add a Cat</h2>
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
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="form-group-add">
                        <label>Breed:</label>
                        <select name="breed" value={formData.breed} onChange={handleChange} required>
                            <option value="" disabled>Select Breed</option>
                            {breeds.map((breed, index) => (
                                <option key={index} value={breed.toUpperCase().replace(" ", "_")}>{breed}</option>
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
                                checked={formData.indoorCat === 'yes'}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                    </div>
                    <div className="form-group-add">
                        <label>Color:</label>
                        <select name="color" value={formData.color} onChange={handleChange} required>
                            <option value="" disabled>Select Color</option>
                            {colors.map((color, index) => (
                                <option key={index} value={color.toUpperCase()}>{color}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group-add">
                        <label>Size:</label>
                        <select name="size" value={formData.size} onChange={handleChange} required>
                            <option value="" disabled>Select Size</option>
                            <option value="SMALL">Small</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="BIG">Big</option>
                        </select>
                    </div>
                    <div className="form-group-add">
                        <label>Coat Length:</label>
                        <select name="coatLength" value={formData.coatLength} onChange={handleChange} required>
                            <option value="" disabled>Select Coat Length</option>
                            <option value="SHORT">Short</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="LONG">Long</option>
                        </select>
                    </div>
                    <div className="form-group-add">
                        <label>Can Live With:</label>
                        <select name="canLiveWith" value={formData.canLiveWith} onChange={handleChange} required>
                            <option value="" disabled>Select an Option</option>
                            {canLiveWithOptions.map((option, index) => (
                                <option key={index} value={option.toUpperCase().replace(" ", "_")}>{option}</option>
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
                            name="information"
                            value={formData.information}
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
                            {imagePreviews.map((image, index) => (
                                <div key={index} className="image-preview-box">
                                    <img src={image} alt={`Preview ${index}`} className="image-preview" />
                                    <button type="button" className="delete-image-button" onClick={() => handleImageDelete(index)}>X</button>
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

export default AddCatPage;


