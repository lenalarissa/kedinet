import '../styles/SignUp.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const AdminLogInPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/admin/login?loginId=${id}&password=${password}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.text(); // Assuming the secret key is returned as plain text

            if (data) {
                login(data); // Pass the secret key to the login function
                navigate('/editCats');
            } else {
                setError('Invalid ID or password. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Invalid ID or password. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="frame">
            <NavBar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="box-sign-up">
                            <h5 className="text-center">Admin Log In</h5>
                            <p>Only admins can log in here. If you want to log in and
                                you are not an admin, click on 'Log In' in the Navigation Bar at the top.</p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="id">ID:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="id"
                                        placeholder="Enter your ID"
                                        value={id}
                                        onChange={handleIdChange}
                                    />
                                    <p></p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <p></p>
                                </div>
                                {error && <p className="text-danger">{error}</p>}
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="showPassword"
                                        checked={showPassword}
                                        onChange={togglePasswordVisibility}
                                    />
                                    <label className="form-check-label" htmlFor="showPassword">
                                        Show Password
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminLogInPage;

