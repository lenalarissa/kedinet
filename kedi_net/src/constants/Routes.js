import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import CatProfileForUserPage from '../pages/CatProfileForUserPage';
import SignUpPage from '../pages/SignUpPage';
import LogInPage from '../pages/LogInPage';
import HelpPage from '../pages/HelpPage';
import FavCatsPage from '../pages/FavCatsPage';
import AdminLogInPage from '../pages/AdminLogInPage';
import EditCatsPage from '../pages/EditCatsPage';
import AddCatPage from '../pages/AddCatPage';
import CatProfileForAdminPage from '../pages/CatProfileForAdminPage';
import AboutPage from '../pages/AboutPage';
import UserAccountPage from '../pages/UserAccountPage';
import EditCatFormPage from '../pages/EditCatFormPage';

const RouteConfig = () => {
        return (
            <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/catUser/:catId" element={<CatProfileForUserPage />} />
                    <Route path="/catAdmin/:catId" element={<CatProfileForAdminPage />} />
                    <Route path="/signUp" element={<SignUpPage />} />
                    <Route path="/login" element={<LogInPage />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/favCats" element={<FavCatsPage />} />
                    <Route path="/admin" element={<AdminLogInPage />} />
                    <Route path="/editCats" element={<EditCatsPage />} />
                    <Route path="/addCat" element={<AddCatPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/account" element={<UserAccountPage />} />
                    <Route path="/editCat/:catId" element={<EditCatFormPage />} />
            </Routes>
        );
}

export default RouteConfig;
