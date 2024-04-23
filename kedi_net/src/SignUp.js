import './SignUp.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
        }
        // will look into the database, this is for testing purposes
        else if (email === 'user@gmail.com') {
            setError('Email is already in use');
        }
        // Check if password is longer than 8 characters
        else if (password.length < 8) {
            setError('Password must be at least 8 characters long');
        }
        else {
            // user data is saved in database
            // user is logged in successfully
            login();
            navigate('/', { state: { loginSuccess: true } });
        }
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="box top-box">
                        <h5 className="box-sign-up text-center">Sign Up</h5>
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
                                <label htmlFor="password">Password (min. length of 8):</label>
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
                            <div className="form-group">
                                <label htmlFor="confirm-password">Password (repeated):</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirm-password"
                                    placeholder="Repeat your password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                                <p></p>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
