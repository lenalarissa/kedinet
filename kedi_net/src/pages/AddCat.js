import React, { useState } from 'react';
import '../styles/AddCat.css';
import { useNavigate } from 'react-router-dom';
import NavBarAdmin from "../components/NavBarAdmin";

const AddCat = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        breed: '',
        age: '',
        indoorCat: '',
        size: '',
        coatLength: '',
        canLiveWith: [],
        disease: '',
        information: '',
        images: []
    });

    const breeds = [
        "Abyssinian", "Aegean cat", "American Bobtail", "American Curl", "American Shorthair", "American Wirehair",
        "Arabian Mau", "Asian cat", "Australian Mist", "Balinese cat", "Bengal cat", "Birman", "Bohemian Rex",
        "Bombay cat", "Brazilian Shorthair", "British Longhair", "British Shorthair", "Burmese cat", "Burmilla",
        "California Spangled", "Cashmere cat", "Chantilly-Tiffany", "Chartreux", "Chausie", "Colorpoint Shorthair",
        "Cornish Rex", "Cymric cat", "Cyprus cat", "Devon Rex", "Domestic Cat", "Donskoy cat", "Dragon Li", "Egyptian Mau",
        "European Shorthair", "Exotic Shorthair", "Foldex cat", "Foreign White", "German Rex", "Havana Brown",
        "Highlander cat", "Himalayan cat", "Isle of Man Longhair cat", "Isle of Man Shorthair cat", "Japanese Bobtail",
        "Javanese cat", "Kanaani cat", "Karelian Bobtail", "Khao Manee", "Korat", "Korn Ja", "Kurilian Bobtail",
        "LaPerm", "Lykoi", "Maine Coon", "Manx cat", "Mekong Bobtail", "Mexican Hairless Cat", "Minskin", "Minuet cat",
        "Munchkin cat", "Nebelung", "Ocicat", "Ojos Azules", "Oriental Bicolour", "Oriental Longhair", "Oriental Shorthair",
        "Persian cat", "Peterbald", "Pittsburgh refrigerator cat", "Pixie-bob", "Ragamuffin cat", "Ragdoll",
        "Russian Blue", "Russian White", "Savannah cat", "Scottish Fold", "Selkirk Rex", "Serengeti cat",
        "Siamese cat", "Neva Masquerade", "Siberian cat", "Singapura cat", "Snowshoe cat", "Sokoke", "Somali cat",
        "Sphynx cat", "Suphalak", "Thai cat", "Thai Lilac", "Tiffanie cat", "Tonkinese cat", "Toybob", "Toyger",
        "Traditional Persian", "Traditional Siamese cat", "Turkish Angora", "Turkish Van", "Ukrainian Levkoy", "York Chocolate"
    ];

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
        // the data would be add to the database now
        navigate('/editCats');
    };

    return (
        <body>
        <NavBarAdmin/>
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
                        pattern="[A-Za-z]+"
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
                    <select name="size" value={formData.size} onChange={handleChange} required>
                        <option value="" disabled>Select Size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="big">Big</option>
                    </select>
                </div>
                <div className="form-group-add">
                    <label>Coat Length:</label>
                    <select name="coatLength" value={formData.coatLength} onChange={handleChange} required>
                        <option value="" disabled>Select Coat Length</option>
                        <option value="short">Short</option>
                        <option value="medium">Medium</option>
                        <option value="long">Long</option>
                    </select>
                </div>
                <div className="form-group-add">
                    <label>Can Live With:</label>
                    <div className="can-live-with-options">
                        {canLiveWithOptions.map((option, index) => (
                            <div className="can-live-with-option" key={index}>
                                <input type="checkbox" name="canLiveWith" value={option}
                                       checked={formData.canLiveWith.includes(option)}
                                       onChange={handleCanLiveWithChange}/>
                                <label>{option}</label>
                            </div>
                        ))}
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
        </body>
    );
};

export default AddCat;
