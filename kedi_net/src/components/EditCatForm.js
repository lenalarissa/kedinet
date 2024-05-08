import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import breeds from '../constants/Breeds';
import '../styles/AddCat.css';

const EditCatForm = ({ cat }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        breed: '',
        age: 0,
        indoorCat: 'no',
        size: '',
        coatLength: '',
        canLiveWith: [],
        disease: '',
        information: '',
        images: [],
    });

    useEffect(() => {
        console.log('Cat data received:', cat);
        if (cat) {
            setFormData(cat);
        }
    }, [cat]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('Input changed:', name, value);
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

    const handleCanLiveWithChange = (e) => {
        const { value } = e.target;
        const updatedCanLiveWith = [...formData.canLiveWith];
        if (updatedCanLiveWith.includes(value)) {
            updatedCanLiveWith.splice(updatedCanLiveWith.indexOf(value), 1);
        } else {
            updatedCanLiveWith.push(value);
        }
        setFormData(prevState => ({
            ...prevState,
            canLiveWith: updatedCanLiveWith
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/editCats');
    };

    return (
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
                        pattern="[A-Za-z]+"
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
                            checked={formData.indoorCat === 'yes'}
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
                    <div className="can-live-with-options">
                        <label>
                            <input
                                type="checkbox"
                                name="canLiveWith"
                                value="Calm people only"
                                checked={formData.canLiveWith.includes('Calm people only')}
                                onChange={handleCanLiveWithChange}
                            />
                            Calm people only
                        </label>
                        {/* Add other options similarly */}
                    </div>
                </div>
                <div className="form-group-add">
                    <label>Disease:</label>
                    <input
                        type="text"
                        name="disease"
                        value={formData.disease}
                        onChange={handleChange}
                        maxLength={50}
                        required
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
                        onChange={(e) => {
                            const selectedImages = Array.from(e.target.files).slice(0, 5);
                            setFormData(prevState => ({
                                ...prevState,
                                images: [...prevState.images, ...selectedImages]
                            }));
                        }}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EditCatForm;
