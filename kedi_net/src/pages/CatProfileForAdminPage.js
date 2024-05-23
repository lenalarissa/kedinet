import NavBarAdmin from '../components/NavBarAdmin';
import EditCatFormPage from './EditCatFormPage';
import cats from '../constants/Cats';

const CatProfileForAdminPage = ({ catId }) => {
    const cat = cats.find(cat => cat.id === parseInt(catId));

    return (
        <div>
            <NavBarAdmin />
            <EditCatFormPage cat={cat} />
        </div>
    );
};

export default CatProfileForAdminPage;
