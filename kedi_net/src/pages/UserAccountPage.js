import '../styles/SignUp.css';
import { useState } from 'react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const UserAccountPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else if (password.length < 8) {
            setError('Password must be at least 8 characters long');
        } else {
            setSuccessMessage('Password changed successfully');
            // Here, you would change the password in the database
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
                            <h5 className="text-center">User's account</h5>
                            <p></p>
                            <p>Change your password here:</p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="password">New Password (min. length of 8):</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your new password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <p></p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirm-password">Confirm New Password:</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="confirm-password"
                                        placeholder="Repeat your new password"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                    <p></p>
                                </div>
                                {error && <p className="text-danger">{error}</p>}
                                {successMessage && <p className="text-success">{successMessage}</p>}
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
                                <button type="submit" className="btn btn-primary btn-block">Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserAccountPage;
