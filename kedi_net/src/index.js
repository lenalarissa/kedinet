import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider component

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider> {/* Wrap the App component with AuthProvider */}
            <App />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
