import '../styles/SignUp.css';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const AboutPage = () => {
    return (
        <div className="frame">
            <NavBar/>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="box-sign-up">
                            <h5 className="text-center">About</h5>
                            <p>
                                <br/>
                                Welcome to Kedi-net Istanbul, a platform for finding and adopting cats in Istanbul!<br/>
                                <br/>
                                At Kedi-net Istanbul,
                                we are passionate about connecting individuals with their
                                purrfect cat-companions.
                                This platform offers various filtering options to help you find the perfect match.
                                Finding your new furry friend has never been easier.<br/>
                                <br/>
                                Start your adoption journey today with Kedi-net Istanbul
                                and make a difference in the life of your new cat-friend!</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default AboutPage;
