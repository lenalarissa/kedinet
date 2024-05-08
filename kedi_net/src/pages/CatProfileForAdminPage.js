import NavBarAdmin from '../components/NavBarAdmin';
import EditCatForm from '../components/EditCatForm';
import cats from '../constants/Cats';

const CatProfileForAdminPage = ({ catId }) => {
    const cat = cats.find(cat => cat.id === parseInt(catId));

    return (
        <div>
            <NavBarAdmin />
            <EditCatForm cat={cat} />
        </div>
    );
};

export default CatProfileForAdminPage;
