import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import CatProfile from '../pages/CatProfile';
import SignUp from '../pages/SignUp';
import LogIn from '../pages/LogIn';
import Help from '../pages/Help';
import FavCats from '../pages/FavCats';
import Admin from '../pages/Admin';
import EditCats from '../pages/EditCats';
import AddCat from '../pages/AddCat';
import AuthContext from "../AuthContext";

const RouteConfig = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<SearchPage />} />
                <Route path="/cat/:catId" element={<CatProfile />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/help" element={<Help />} />
                <Route path="/favCats" element={<FavCats />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/editCats" element={<EditCats />} />
                <Route path="/addCat" element={<AddCat />} />
            </Routes>
        </Router>
    );
}

export default RouteConfig;