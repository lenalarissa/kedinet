import '../styles/CatProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useParams} from 'react-router-dom';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React, {useState} from 'react';
import {useAuth} from "../AuthContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CatsProfilePopup from "../components/CatsProfilePopup";
import matar1 from "../assets/cat_img/matar1.jpg";
import matar2 from "../assets/cat_img/matar2.JPG";
import matar3 from "../assets/cat_img/matar3.JPG";
import matar4 from "../assets/cat_img/matar4.JPG";
import matar5 from "../assets/cat_img/matar5.JPG";
import cat2 from "../assets/cat_img/2.jpeg";
import cat3 from "../assets/cat_img/3.jpeg";
import cat4 from "../assets/cat_img/4.jpeg";
import cat5 from "../assets/cat_img/5.jpg";
import cat6 from "../assets/cat_img/6.jpg";
import cat7 from "../assets/cat_img/7.jpeg";


const CatProfile = () => {
    // some mock cats as objects since there is no connection to the database yet
    const cats = [{
        id: 1,
        name: 'Matar',
        breed: 'Arabian Mau',
        gender: 'Female',
        region: 'Kadiköy',
        images: [matar1, matar2, matar3, matar4, matar5],
        about: 'Matar is a young playful cat. She was born on a rainy night in Jerusalem and was the only one of her siblings to survive. So she grew up as an only child, but was very cared for by her mother and her human roommates. She loves other people, is very curious and cuddly.',
        age: 2,
        indoorCat: 'yes',
        size: 'medium',
        coatLength: 'medium',
        canLiveWith: 'other cats & children',
        disease: 'none',
        shelter: {
            name: 'Kadıköy Shelter',
            address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
            website: 'no Website available',
            email: 'shelter.rasimpasa@gmail.com',
            phone: '(090)123456789'
        }
    }, {
        id: 2,
        name: 'Whiskers',
        breed: 'Siamese',
        gender: 'Female',
        region: 'Kadiköy',
        images: ['cat2'],
        shelter: {
            name: 'Kadıköy Shelter',
            address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
            website: 'no Website available',
            email: 'shelter.rasimpasa@gmail.com',
            phone: '(090)123456789'
        }
    }, {
        id: 3,
        name: 'Snowball',
        breed: 'Maine Coon',
        gender: 'Female',
        region: 'Beşiktaş',
        images: ['cat3'],
        shelter: {
            name: 'Kadıköy Shelter',
            address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
            website: 'no Website available',
            email: 'shelter.rasimpasa@gmail.com',
            phone: '(090)123456789'
        }
    }, {
        id: 4,
        name: 'Mittens',
        breed: 'Ragdoll',
        gender: 'Male',
        region: 'Şişli',
        images: ['cat4'],
        shelter: {
            name: 'Kadıköy Shelter',
            address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
            website: 'no Website available',
            email: 'shelter.rasimpasa@gmail.com',
            phone: '(090)123456789'
        }
    }, {
        id: 5,
        name: 'Simba',
        breed: 'Bengal',
        gender: 'Male',
        region: 'Üsküdar',
        images: ['cat5'],
        shelter: {
            name: 'Kadıköy Shelter',
            address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
            website: 'no Website available',
            email: 'shelter.rasimpasa@gmail.com',
            phone: '(090)123456789'
        }
    }, {
        id: 6,
        name: 'Luna',
        breed: 'Scottish Fold',
        gender: 'Female',
        region: 'Kadıköy',
        images: ['cat6'],
        shelter: {
            name: 'Kadıköy Shelter',
            address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
            website: 'no Website available',
            email: 'shelter.rasimpasa@gmail.com',
            phone: '(090)123456789'
        }
    }, {
        id: 7,
        name: 'Max',
        breed: 'Sphynx',
        gender: 'Male',
        region: 'Beyoğlu',
        images: ['cat7'],
        shelter: {
            name: 'Kadıköy Shelter',
            address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
            website: 'no Website available',
            email: 'shelter.rasimpasa@gmail.com',
            phone: '(090)123456789'
        }
    }];
    const {catId} = useParams();
    const cat = cats.find(cat => cat.id === parseInt(catId));

    const [heartClicked, setHeartClicked] = useState(false);
    const {isLoggedIn, logout} = useAuth();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);


    if (!cat) {
        return <div>Cat not found!</div>;
    }

    // settings for the slider
    const settings = {
        dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1
    };


    const handleHeartClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoggedIn) {
            setHeartClicked(!heartClicked);
        } else {
            setShowLoginPrompt(true);
        }
    };

    return (
        <body>
            <NavBar/>
            <div className="container-fluid full-width-container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="cat-name-box">
                            <div className="box-name-text">
                                <row>
                                    {cat.name}
                                    <button
                                        type="button"
                                        className="profile-heart-button"
                                        style={{color: heartClicked ? 'black' : 'white', zIndex: 1}}
                                        onClick={handleHeartClick}
                                    >
                                        <i className={heartClicked ? 'fas fa-heart' : 'far fa-heart'}></i>
                                    </button>

                                </row>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Image Slider Box */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="image-slider-box">
                                    <Carousel
                                        showThumbs={false} // no thumbnail overview
                                        showIndicators={false}
                                        infiniteLoop={true}
                                        swipeable={true}
                                    >
                                        {cat.images.map((image, index) => (<div key={index}>
                                                <img src={image} alt={`Slide ${index + 1}`}
                                                     style={{height: '310px', width: "auto"}}/>
                                            </div>))}
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* About, Characteristics, and Shelter Boxes */}
                <div className="container-fluid full-width-container mt-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="about-box">
                                <h5 className="box-title">About</h5>
                                <p className="box-text"></p>
                                <p className="box-text">{cat.about}</p>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid full-width-container mt-3">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="smaller-box">
                                    <h5 className="box-title">Characteristics</h5>
                                    <p className="box-text"></p>
                                    <p className="box-text">Gender: {cat.gender}</p>
                                    <p className="box-text">Breed: {cat.breed}</p>
                                    <p className="box-text">Age: {cat.age}</p>
                                    <p className="box-text">Indoor Cat: {cat.indoorCat}</p>
                                    <p className="box-text">Size: {cat.size}</p>
                                    <p className="box-text">Coat Length: {cat.coatLength}</p>
                                    <p className="box-text">Can live with: {cat.canLiveWith}</p>
                                    <p className="box-text">Disease: {cat.disease}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="smaller-box">
                                    <h5 className="box-title">Shelter</h5>
                                    <p className="box-text"></p>
                                    <p className="box-text">{cat.shelter.name}</p>
                                    <p className="box-text">Address: {cat.shelter.address}</p>
                                    <p className="box-text">Website: {cat.shelter.website}</p>
                                    <p className="box-text">e-mail: {cat.shelter.email}</p>
                                    <p className="box-text">Phone: {cat.shelter.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CatsProfilePopup showLoginPrompt={showLoginPrompt} setShowLoginPrompt={setShowLoginPrompt} />
            </div>
            <Footer/>
        </body>
    );
}

export default CatProfile;
