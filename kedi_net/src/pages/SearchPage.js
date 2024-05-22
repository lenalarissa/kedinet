import '../styles/SearchPage.css';
import {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {useAuth} from "../AuthContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import matar1 from "../assets/cat_img/matar1.jpg";
import cat2 from "../assets/cat_img/2.jpeg";
import cat3 from "../assets/cat_img/3.jpeg";
import cat4 from "../assets/cat_img/4.jpeg";
import cat5 from "../assets/cat_img/5.jpg";
import cat6 from "../assets/cat_img/6.jpg";
import cat7 from "../assets/cat_img/7.jpeg";
import breeds from '../constants/Breeds'
import CatsProfilePopup from "../components/CatsProfilePopup";


const SearchPage = () => {

    const [cats, setCats] = useState([]);


    // Regions
    const [showRegions, setShowRegions] = useState(false);
    const [selectedRegions, setSelectedRegions] = useState([]);
    const regions = [
        "Adalar", "Arnavutkoy", "Atasehir", "Avcilar", "Bagcilar", "Bahcelievler",
        "Bakirkoy", "Basaksehir", "Bayrampasa", "Besiktas", "Beykoz", "Beylikduzu",
        "Beyoglu", "Buyukcekmece", "Catalca", "Cekmekoy", "Esenler", "Esenyurt",
        "Eyupsultan", "Fatih", "Gaziosmanpasa", "Gungoren", "Kadikoy", "Kagithane",
        "Kartal", "Kucukcekmece", "Maltepe", "Pendik", "Sancaktepe", "Sariyer",
        "Sile", "Silivri", "Sisli", "Sultanbeyli", "Sultangazi", "Tuzla", "Umraniye",
        "Uskudar", "Zeytinburnu"
    ];
    // toggle is for showing filtering options or not
    const toggleRegions = () => {
        setShowRegions(!showRegions);
    };
    // handles selecting or de-selecting if sth was selected previously
    const handleRegionChange = (region) => {
        if (selectedRegions.includes(region)) {
            setSelectedRegions(selectedRegions.filter(item => item !== region));
        } else {
            setSelectedRegions([...selectedRegions, region]);
        }
    };

    // Breeds
    const [showBreeds, setShowBreeds] = useState(false);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const toggleBreeds = () => {
        setShowBreeds(!showBreeds);
    };
    const handleBreedChange = (breed) => {
        if (selectedBreeds.includes(breed)) {
            setSelectedBreeds(selectedBreeds.filter(item => item !== breed));
        } else {
            setSelectedBreeds([...selectedBreeds, breed]);
        }
    };


    // Can Live With...
    const [showCanLiveWith, setShowCanLiveWith] = useState(false);
    const [selectedCanLiveWith, setSelectedCanLiveWith] = useState([]);
    const canLiveWithOptions = ["Calm people only", "Children", "Dogs", "Cats"];
    const toggleCanLiveWith = () => {
        setShowCanLiveWith(!showCanLiveWith);
    };
    const handleCanLiveWithChange = (option) => {
        if (selectedCanLiveWith.includes(option)) {
            setSelectedCanLiveWith(selectedCanLiveWith.filter(item => item !== option));
        } else {
            setSelectedCanLiveWith([...selectedCanLiveWith, option]);
        }
    };

    // Color
    const [showColors, setShowColors] = useState(false);
    const [selectedColors, setSelectedColors] = useState([]);
    const colors = ["Black", "White", "Grey", "Brown", "Orange"];
    const toggleColors = () => {
        setShowColors(!showColors);
    };
    const handleColorChange = (color) => {
        if (selectedColors.includes(color)) {
            setSelectedColors(selectedColors.filter(item => item !== color));
        } else {
            setSelectedColors([...selectedColors, color]);
        }
    };

    // Age
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(20);
    const handleMinAgeChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 0 && value <= maxAge) {
            setMinAge(value);
        } else {
            setMinAge('');
        }
    };
    const handleMaxAgeChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= minAge && value <= 20) {
            setMaxAge(value);
        } else {
            setMaxAge('');
        }
    };

    // Gender
    const genders = ["Female", "Male"];
    const [selectedGender, setSelectedGender] = useState([]);
    const handleGenderChange = (gender) => {
        if (selectedGender.includes(gender)) {
            setSelectedGender(selectedGender.filter(item => item !== gender));
        } else {
            setSelectedGender([...selectedGender, gender]);
        }
    };

    // Indoor Cat
    const indoorCatOptions = ["Yes", "No"];
    const [selectedIndoorCat, setSelectedIndoorCat] = useState([]);
    const handleIndoorCatChange = (option) => {
        if (selectedIndoorCat.includes(option)) {
            setSelectedIndoorCat(selectedIndoorCat.filter(item => item !== option));
        } else {
            setSelectedIndoorCat([...selectedIndoorCat, option]);
        }
    };

    // Size
    const sizeOptions = ["Small", "Medium", "Big"];
    const [selectedSize, setSelectedSize] = useState([]);
    const handleSizeChange = (size) => {
        if (selectedSize.includes(size)) {
            setSelectedSize(selectedSize.filter(item => item !== size));
        } else {
            setSelectedSize([...selectedSize, size]);
        }
    };

    // Coat Length
    const coatLengthOptions = ["Short", "Medium", "Long"];
    const [selectedCoatLength, setSelectedCoatLength] = useState([]);
    const handleCoatLengthChange = (length) => {
        if (selectedCoatLength.includes(length)) {
            setSelectedCoatLength(selectedCoatLength.filter(item => item !== length));
        } else {
            setSelectedCoatLength([...selectedCoatLength, length]);
        }
    };

    // Search Button
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const convertToUpperCase = (value) => {
        if (typeof value === 'string') {
            return value.toUpperCase();
        } else if (Array.isArray(value)) {
            return value.map(v => v.toUpperCase());
        }
        return value;
    };

    const fetchCats = (searchParams = {}) => {
        const params = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, value]) => {
            if (key === "selectedIndoorCat" && value.includes("Yes") && value.includes("No")) {
                // Skip adding the selectedIndoorCat parameter if both Yes and No are selected
                return;
            }
            if (Array.isArray(value) && value.length > 0) {
                params.append(key, value.map(v => typeof v === 'string' ? v.toUpperCase().replace(/ /g, '_') : v).join(','));
            } else if (Array.isArray(value) && value.length === 0) {
                params.append(key, '');
            } else if (value || value === 0) {
                params.append(key, typeof value === 'string' ? value.toUpperCase().replace(/ /g, '_') : value);
            }
        });

        const url = `http://localhost:8080/readSearchedCats?${params.toString()}`;
        console.log("URL being requested:", url);

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
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
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCats(); // Fetch initial cats data when the component mounts
    }, []); // Empty dependency array ensures this runs only once

    const handleSearchClick = () => {
        console.log("Searching with:", {
            minAge, maxAge, selectedBreeds, selectedCanLiveWith, selectedCoatLength,
            selectedColors, selectedGender, selectedIndoorCat, selectedRegions, selectedSize
        });
        fetchCats({
            minAge: minAge,
            maxAge: maxAge,
            selectedBreeds: selectedBreeds,
            selectedCanLiveWith: selectedCanLiveWith,
            selectedCoatLength: selectedCoatLength,
            selectedColors: selectedColors,
            selectedGender: selectedGender,
            selectedIndoorCat: selectedIndoorCat,
            selectedRegions: selectedRegions,
            selectedSize: selectedSize
        });
    };

    // Images
    const getImagePath = (imageName) => {
        try {
            return require(`../assets/cat_images/${imageName}`);
        } catch (err) {
            console.error('Error loading image:', imageName, err);
            return null;
        }
    };


    // Reset Button
    // resets all filtering options
    const handleResetClick = () => {
        setSelectedRegions([]);
        setSelectedBreeds([]);
        setSelectedCanLiveWith([]);
        setSelectedColors([]);
        setMinAge(0);
        setMaxAge(20);
        setSelectedGender([]);
        setSelectedIndoorCat([]);
        setSelectedSize([]);
        setSelectedCoatLength([]);
    };

    // Sorting
    const [selectedOption, setSelectedOption] = useState('newest-oldest');
    const handleSortChange = (event) => {
        setSelectedOption(event.target.value);
        // sorting the list in a new way needs connection to backend
    };

    // Heart-Button
    const {isLoggedIn} = useAuth();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [heartClickedCats, setHeartClickedCats] = useState([]);
    const handleHeartClick = (catId, e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoggedIn) {
            // only for simulation
            if (heartClickedCats.includes(catId)) {
                setHeartClickedCats(heartClickedCats.filter(id => id !== catId));
            } else {
                setHeartClickedCats([...heartClickedCats, catId]);
            }
        } else {
            setShowLoginPrompt(true);
        }
    };

    return (
        <div className="frame">
            <NavBar/>
            <div className="search-page">
                <div className="filtering-section">
                    <div className="container mt-4">
                        {/* First Row */}
                        <div className="row">
                            {/* Regions */}
                            <div className="col">
                                <div className="filter-box">
                                    <div className="form-group">
                                        <label onClick={toggleRegions}>
                                            {showRegions ? <span>-</span> : <span>+</span>} Regions:
                                        </label>
                                        {showRegions && (
                                            <div>
                                                {regions.map((region, index) => (
                                                    <div key={index} className="form-check">
                                                        <input type="checkbox" id={region} value={region}
                                                               checked={selectedRegions.includes(region)}
                                                               onChange={() => handleRegionChange(region)}/>
                                                        <label htmlFor={region}>{region}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Breed */}
                            <div className="col">
                                <div className="filter-box">
                                    <div className="form-group">
                                        <label onClick={toggleBreeds}>
                                            {showBreeds ? <span>-</span> : <span>+</span>} Breeds:
                                        </label>
                                        {showBreeds && (
                                            <div>
                                                {breeds.map((breed, index) => (
                                                    <div key={index} className="form-check">
                                                        <input type="checkbox" id={breed} value={breed}
                                                               checked={selectedBreeds.includes(breed)}
                                                               onChange={() => handleBreedChange(breed)}/>
                                                        <label htmlFor={breed}>{breed}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Can live with... */}
                            <div className="col">
                                <div className="filter-box">
                                    <div className="form-group">
                                        <label onClick={toggleCanLiveWith}>
                                            {showCanLiveWith ? <span>-</span> : <span>+</span>} Can live with:
                                        </label>
                                        {showCanLiveWith && (
                                            <div>
                                                {canLiveWithOptions.map((option, index) => (
                                                    <div key={index} className="form-check">
                                                        <input type="checkbox" id={option} value={option}
                                                               checked={selectedCanLiveWith.includes(option)}
                                                               onChange={() => handleCanLiveWithChange(option)}/>
                                                        <label htmlFor={option}>{option}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Color */}
                            <div className="col">
                                <div className="filter-box">
                                    <div className="form-group">
                                        <label onClick={toggleColors}>
                                            {showColors ? <span>-</span> : <span>+</span>} Color:
                                        </label>
                                        {showColors && (
                                            <div>
                                                {colors.map((color, index) => (
                                                    <div key={index} className="form-check">
                                                        <input type="checkbox" id={color} value={color}
                                                               checked={selectedColors.includes(color)}
                                                               onChange={() => handleColorChange(color)}/>
                                                        <label htmlFor={color}>{color}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Second Row */}
                        <div className="row">
                            {/* Age */}
                            <div className="col">
                                <div className="filter-box-check">
                                    <div className="form-group">
                                        <label>Age:</label>
                                        <div className="input-group">
                                            <input type="number" className="form-control" id="minAge"
                                                   value={minAge} onChange={handleMinAgeChange}/>
                                            <span className="input-group-text">-</span>
                                            <input type="number" className="form-control" id="maxAge"
                                                   value={maxAge} onChange={handleMaxAgeChange}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Gender */}
                            <div className="col">
                                <div className="filter-box-check">
                                    <div className="form-group">
                                        <label>Gender:</label><br/>
                                        {genders.map((gender, index) => (
                                            <div key={index} className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" id={gender}
                                                       value={gender}
                                                       checked={selectedGender.includes(gender)}
                                                       onChange={() => handleGenderChange(gender)}/>
                                                <label className="form-check-label" htmlFor={gender}>{gender}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Indoor Cat */}
                            <div className="col">
                                <div className="filter-box-check">
                                    <div className="form-group">
                                        <label>Indoor Cat:</label><br/>
                                        {indoorCatOptions.map((option, index) => (
                                            <div key={index} className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" id={option}
                                                       value={option}
                                                       checked={selectedIndoorCat.includes(option)}
                                                       onChange={() => handleIndoorCatChange(option)}/>
                                                <label className="form-check-label" htmlFor={option}>{option}</label>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                            {/* Size */}
                            <div className="col">
                                <div className="filter-box-check">
                                    <div className="form-group">
                                        <label>Size:</label><br/>
                                        {sizeOptions.map((size, index) => (
                                            <div key={index} className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" id={size}
                                                       value={size}
                                                       checked={selectedSize.includes(size)}
                                                       onChange={() => handleSizeChange(size)}/>
                                                <label className="form-check-label" htmlFor={size}>{size}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Coat Length */}
                            <div className="col">
                                <div className="filter-box-check">
                                    <div className="form-group">
                                        <label>Coat Length:</label><br/>
                                        {coatLengthOptions.map((length, index) => (
                                            <div key={index} className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" id={length}
                                                       value={length}
                                                       checked={selectedCoatLength.includes(length)}
                                                       onChange={() => handleCoatLengthChange(length)}/>
                                                <label className="form-check-label" htmlFor={length}>{length}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Third Row */}
                        <div className="row align-items-center">
                            <div className="col-lg-9"></div>
                            {/* Reset Button */}
                            <div className="col-lg-3">
                                <div className="row justify-content-end">
                                    <div className="col-auto align-self-center">
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-block reset-btn"
                                            onClick={handleResetClick}
                                        >
                                            Reset all Filters
                                        </button>
                                    </div>
                                    {/* Search Button */}
                                    <div className="col-auto align-self-center">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-block search-btn"
                                            onClick={handleSearchClick}
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* String of selected filtering option */}{/*
                    <div className="container mt-3">
                        <p>{selectedFiltersString}</p>
                    </div>*/}
                </div>
                {/* Sorting Section */}
                <div className="container mt-3 sorting-section">
                    <div className="row justify-content-end">
                        <div className="col-auto">
                            <label className="mr-2">Sort by:</label>
                        </div>
                        <div className="col-auto">
                            <div className="form-group">
                                <label htmlFor="sortOptions"></label>
                                <select
                                    className="form-control form-control-sm"
                                    id="sortOptions"
                                    value={selectedOption}
                                    onChange={handleSortChange}
                                >
                                    <option value="newest-oldest">Addition (newest to oldest)</option>
                                    <option value="oldest-newest">Addition (oldest to newest)</option>
                                    <option value="young-old">Age (young to old)</option>
                                    <option value="old-young">Age (old to young)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Cats Section */}
                <div className="container mt-3">
                    <div className="row">
                        {cats.map((cat, index) => (
                            <div className="col-md-3" key={index}>
                                <div className="cat-box">
                                    <Link to={`/catUser/${cat.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                        <div className="box-image position-relative">
                                            <img
                                                src={cat.imageNames && cat.imageNames.length > 0 ? getImagePath(cat.imageNames[0]) : null}
                                                alt="Cat Image"
                                            />
                                        </div>
                                        <div className="box-details" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}>
                                            <h5 className="box-with-button">{cat.name}</h5>
                                            <button
                                                type="button"
                                                className="btn heart-button"
                                                style={{
                                                    color: heartClickedCats.includes(cat.id) ? 'black' : 'white',
                                                }}
                                                onClick={(e) => {
                                                    handleHeartClick(cat.id, e); // Pass only the cat id
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faHeart} size="1x"/>
                                            </button>
                                        </div>
                                        <p className="box-info">Breed: {cat.breed} | Gender: {cat.gender}</p>
                                        <p className="box-info">Region: {cat.region}</p>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <CatsProfilePopup showLoginPrompt={showLoginPrompt} setShowLoginPrompt={setShowLoginPrompt}/>
            </div>
            <Footer/>
        </div>
    );
};


export default SearchPage;
