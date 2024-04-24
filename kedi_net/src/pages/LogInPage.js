import '../styles/LogIn.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../AuthContext';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const LogInPage = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // not refreshing the page
        // simulation of the log in process
        if (email === 'user@gmail.com' && password === 'password') {
            login();
            navigate('/');
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="frame">
            <NavBar/>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="box top-box">
                            <h5 className="box-sign-up text-center">Log In</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">e-mail:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your e-mail"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    <p></p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <p></p>
                                </div>
                                {error && <p className="text-danger">{error}</p>}
                                <button type="submit" className="btn btn-primary btn-block">Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default LogInPage;
