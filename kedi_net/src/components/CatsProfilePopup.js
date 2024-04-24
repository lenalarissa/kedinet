import '../styles/Popup.css';

const CatsProfilePopup = ({showLoginPrompt, setShowLoginPrompt}) => {
    return (
        showLoginPrompt && (
            <div className="popup">
                <h2>Login Required</h2>
                <p>You need to be logged in to save a cat.</p>
                <button onClick={() => setShowLoginPrompt(false)}>Close</button>
            </div>
        )
    );
}

export default CatsProfilePopup;