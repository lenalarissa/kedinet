import './CatProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useParams} from 'react-router-dom';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React, {useState} from 'react';
import {useAuth} from "./AuthContext";


const CatProfile = () => {
    // some mock cats as objects since there is no connection to the database yet
    const cats = [
        {
            id: 1,
            name: 'Fluffy',
            breed: 'Persian',
            gender: 'Male',
            region: 'Kadiköy',
            images: ['https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg', 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg', 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/rockcms/2022-08/220805-domestic-cat-mjf-1540-382ba2.jpg'],
            about: 'Introducing this lovely cat-friend, a distinguished gentleman with a heart brimming with affection. This handsome boy\n' +
                '                    boasts a pedigree adorned with accolades from his days as a show-stopping kitten. With his confident\n' +
                '                    yet gentle demeanor, Leo exudes charm and grace in every purr and meow.\n' +
                '                    Leo\'s journey began in the loving care of an elderly couple, where he flourished in the tranquility\n' +
                '                    of their home. Having been raised in a peaceful environment, he has developed a fondness for\n' +
                '                    quietude and seeks a similar ambiance in his forever home.\n' +
                '                    While Leo is a devoted companion, he prefers to be the sole furry friend in his new abode. With no\n' +
                '                    other animals vying for attention, Leo can lavish his lucky adopter with all the love and affection\n' +
                '                    he has to give.\n' +
                '                    If you\'re in search of a loyal companion to share your days with, Leo could be the perfect match for\n' +
                '                    you. Come meet this captivating cat and experience the joy of welcoming him into your heart and\n' +
                '                    home.',
            shelter: {
                name: 'Kadıköy Shelter',
                address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
                website: 'no Website available',
                email: 'shelter.rasimpasa@gmail.com',
                phone: '(090)123456789'
            }
        },
        {
            id: 2,
            name: 'Whiskers',
            breed: 'Siamese',
            gender: 'Female',
            region: 'Kadiköy',
            images: ['https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg'],
            shelter: {
                name: 'Kadıköy Shelter',
                address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
                website: 'no Website available',
                email: 'shelter.rasimpasa@gmail.com',
                phone: '(090)123456789'
            }
        },
        {
            id: 3,
            name: 'Snowball',
            breed: 'Maine Coon',
            gender: 'Female',
            region: 'Beşiktaş',
            images: ['https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/rockcms/2022-08/220805-domestic-cat-mjf-1540-382ba2.jpg'],
            shelter: {
                name: 'Kadıköy Shelter',
                address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
                website: 'no Website available',
                email: 'shelter.rasimpasa@gmail.com',
                phone: '(090)123456789'
            }
        },
        {
            id: 4,
            name: 'Mittens',
            breed: 'Ragdoll',
            gender: 'Male',
            region: 'Şişli',
            images: ['https://idsb.tmgrup.com.tr/ly/uploads/images/2021/09/08/thumbs/871x871/142774.jpg'],
            shelter: {
                name: 'Kadıköy Shelter',
                address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
                website: 'no Website available',
                email: 'shelter.rasimpasa@gmail.com',
                phone: '(090)123456789'
            }
        },
        {
            id: 5,
            name: 'Simba',
            breed: 'Bengal',
            gender: 'Male',
            region: 'Üsküdar',
            images: ['https://www.cats.org.uk/media/13135/191108case015.jpg?width=500&height=333.3333333333333'],
            shelter: {
                name: 'Kadıköy Shelter',
                address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
                website: 'no Website available',
                email: 'shelter.rasimpasa@gmail.com',
                phone: '(090)123456789'
            }
        },
        {
            id: 6,
            name: 'Luna',
            breed: 'Scottish Fold',
            gender: 'Female',
            region: 'Kadıköy',
            images: ['https://www.cats.org.uk/media/13134/190110case061.jpg?width=500&height=333.3333333333333'],
            shelter: {
                name: 'Kadıköy Shelter',
                address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
                website: 'no Website available',
                email: 'shelter.rasimpasa@gmail.com',
                phone: '(090)123456789'
            }
        },
        {
            id: 7,
            name: 'Max',
            breed: 'Sphynx',
            gender: 'Male',
            region: 'Beyoğlu',
            images: ['https://www.cats.org.uk/media/13136/220325case013.jpg?width=500&height=333.49609375'],
            shelter: {
                name: 'Kadıköy Shelter',
                address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
                website: 'no Website available',
                email: 'shelter.rasimpasa@gmail.com',
                phone: '(090)123456789'
            }
        }
    ];
    const {catId} = useParams();
    const cat = cats.find(cat => cat.id === parseInt(catId));

    const [heartClicked, setHeartClicked] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);


    if (!cat) {
        return <div>Cat not found!</div>;
    }

    // settings for the slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
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
                                    {cat.images.map((image, index) => (
                                        <div key={index}>
                                            <img src={image} alt={`Slide ${index + 1}`}
                                                 style={{height: '310px', width: "auto"}}/>
                                        </div>
                                    ))}
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
                            <p className="box-text"> </p>
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
            {showLoginPrompt && (
                <div className="cats-profile-popup">
                    <h2>Login Required</h2>
                    <p>You need to be logged in to save a cat.</p>
                    <button className="cats-profile-button" onClick={() => setShowLoginPrompt(false)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default CatProfile;
