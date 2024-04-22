import './CatProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';




const CatProfile = () => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                    <div className="box top-box">
                        <h5 className="box-name">Cat Name</h5>
                    </div>
                </div>
            </div>
            {/* Image Slider Box */}
            <div className="row">
                <div className="col-md-12">
                    <div className="box image-slider-box">
                        {/* Image Slider with arrows */}
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className="d-block w-100" src="image1.jpg" alt="First slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src="image2.jpg" alt="Second slide" />
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* About, Characteristics, and Shelter Boxes */}
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6">
                        <div className="box about-box">
                            <h5 className="box-name">About</h5>
                            <p>Introducing Leo...</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex flex-column h-100">
                                    <div className="box characteristics-box flex-grow-1">
                                        <h5 className="box-name">Characteristics</h5>
                                        <p>Gender: Male...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex flex-column h-100">
                                    <div className="box shelter-box flex-grow-1">
                                        <h5 className="box-name">Shelter</h5>
                                        <p>Rasimpasa Shelter...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CatProfile;
