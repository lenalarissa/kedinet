import '../styles/Popup.css';

const FavCatsPopup = ({ handleClose }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <p>To see your favorite cats, sign up or log in to your user account.</p>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}

export default FavCatsPopup;
