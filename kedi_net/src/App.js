import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteConfig from "./constants/Routes";
import { AuthProvider } from './AuthContext';

function App() {
    return (
        <Router>
            <AuthProvider>
                <RouteConfig />
            </AuthProvider>
        </Router>
    );
}

export default App;
