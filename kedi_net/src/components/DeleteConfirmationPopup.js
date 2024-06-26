import '../styles/Popup.css';

const DeleteConfirmationPopup = ({ showConfirmation, handleDeleteConfirm, handleDeleteCancel }) => {
    return (
        showConfirmation && (
            <div className="popup">
                <div className="popup-content">
                    <p>Are you sure you want to delete this cat?</p>
                    <div className="popup-buttons">
                        <button className="confirmation-button" onClick={handleDeleteConfirm}>Yes</button>
                        <button className="confirmation-button" onClick={handleDeleteCancel}>No</button>
                    </div>
                </div>
            </div>
        )
    );
}

export default DeleteConfirmationPopup;
