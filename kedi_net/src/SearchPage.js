import './SearchPage.css';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SearchPage = () => {

    {/* Regions */
    }
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

    {/* Breed */
    }
    const [showBreeds, setShowBreeds] = useState(false);
    const [selectedBreeds, setSelectedBreeds] = useState([]);

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

    {/* Can live with... */
    }
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

    {/* Color */
    }
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

    {/* Age */
    }
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

    {/* Gender */
    }
    const genders = ["Female", "Male"];
    const [selectedGender, setSelectedGender] = useState([]);
    const handleGenderChange = (gender) => {
        if (selectedGender.includes(gender)) {
            setSelectedGender(selectedGender.filter(item => item !== gender));
        } else {
            setSelectedGender([...selectedGender, gender]);
        }
    };

    {/* Indoor Cat */
    }
    const indoorCatOptions = ["Yes", "No"];
    const [selectedIndoorCat, setSelectedIndoorCat] = useState([]);
    const handleIndoorCatChange = (option) => {
        if (selectedIndoorCat.includes(option)) {
            setSelectedIndoorCat(selectedIndoorCat.filter(item => item !== option));
        } else {
            setSelectedIndoorCat([...selectedIndoorCat, option]);
        }
    };

    {/* Size */
    }
    const sizeOptions = ["Small", "Medium", "Big"];
    const [selectedSize, setSelectedSize] = useState([]);
    const handleSizeChange = (size) => {
        if (selectedSize.includes(size)) {
            setSelectedSize(selectedSize.filter(item => item !== size));
        } else {
            setSelectedSize([...selectedSize, size]);
        }
    };

    {/* Coat Length */
    }
    const coatLengthOptions = ["Short", "Medium", "Long"];
    const [selectedCoatLength, setSelectedCoatLength] = useState([]);
    const handleCoatLengthChange = (length) => {
        if (selectedCoatLength.includes(length)) {
            setSelectedCoatLength(selectedCoatLength.filter(item => item !== length));
        } else {
            setSelectedCoatLength([...selectedCoatLength, length]);
        }
    };

    {/* Search */
    }
    const handleSearchClick = () => {
        // hand over the chosen filtering options
    };

    {/* Reset */
    }
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

    const [selectedOption, setSelectedOption] = useState('newest-oldest');

    const handleSortChange = (event) => {
        setSelectedOption(event.target.value);
        // sorting the list in a new way needs connection to backend
    };

    // some mock cats as objects since there is no connection to the database yet
    const cats = [
        {
            id: 1,
            name: 'Fluffy',
            breed: 'Persian',
            gender: 'Male',
            region: 'Kadiköy',
            imageUrl: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'
        },
        {
            id: 2,
            name: 'Whiskers',
            breed: 'Siamese',
            gender: 'Female',
            region: 'Kadiköy',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg'
        },
        {
            id: 3,
            name: 'Snowball',
            breed: 'Maine Coon',
            gender: 'Female',
            region: 'Beşiktaş',
            imageUrl: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/rockcms/2022-08/220805-domestic-cat-mjf-1540-382ba2.jpg'
        },
        {
            id: 4,
            name: 'Mittens',
            breed: 'Ragdoll',
            gender: 'Male',
            region: 'Şişli',
            imageUrl: 'https://idsb.tmgrup.com.tr/ly/uploads/images/2021/09/08/thumbs/871x871/142774.jpg'
        },
        {
            id: 5,
            name: 'Simba',
            breed: 'Bengal',
            gender: 'Male',
            region: 'Üsküdar',
            imageUrl: 'https://www.cats.org.uk/media/13135/191108case015.jpg?width=500&height=333.3333333333333'
        },
        {
            id: 6,
            name: 'Luna',
            breed: 'Scottish Fold',
            gender: 'Female',
            region: 'Kadıköy',
            imageUrl: 'https://www.cats.org.uk/media/13134/190110case061.jpg?width=500&height=333.3333333333333'
        },
        {
            id: 7,
            name: 'Max',
            breed: 'Sphynx',
            gender: 'Male',
            region: 'Beyoğlu',
            imageUrl: 'https://www.cats.org.uk/media/13136/220325case013.jpg?width=500&height=333.49609375'
        }
    ];

    const handleHeartClick = (catId) => {
        // would save the cat to a list of favourites
    };

    return (
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
                            <div className="filter-box">
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
                            <div className="filter-box">
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
                            <div className="filter-box">
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
                            <div className="filter-box">
                                <div className="form-group">
                                    <label>Size:</label><br/>
                                    {sizeOptions.map((size, index) => (
                                        <div key={index} className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id={size} value={size}
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
                            <div className="filter-box">
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
                        {/* Spacing column to align the reset button */}
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
            </div>
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
        </div>
    );
};


export default SearchPage