import '../styles/Popup.css';

const SignUpPopup = ({handleClose}) => {

    return (
        <div className="popup">
            <div className="popup-content">
                <p>You are already logged in. Please log out to sign up for a new account.</p>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}

export default SignUpPopup;
