import './LogIn.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


const Admin = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault(); // not refreshing the page
        // simulation of the log in process
        if (id === '1997' && password === 'password') {
            // if log in is successful, the user goes back to the search page
            login();
            navigate('/editCats')
        }
        else {
            setError('Invalid ID or password. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="box top-box">
                        <h5 className="box-sign-up text-center">Log In</h5>
                        <p>Only admins can log in here. If you want to log in and
                            you are not an admin of this page, click on 'Log In' at the top right of this page. </p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="id">ID:</label>
                                <input
                                    type="id"
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
    );
};

export default Admin;
