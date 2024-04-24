import matar1 from "../assets/cat_img/matar1.jpg";
import matar2 from "../assets/cat_img/matar2.JPG";
import matar3 from "../assets/cat_img/matar3.JPG";
import matar4 from "../assets/cat_img/matar4.JPG";
import matar5 from "../assets/cat_img/matar5.JPG";
import cat2 from "../assets/cat_img/2.jpeg";
import cat3 from "../assets/cat_img/3.jpeg";
import cat4 from "../assets/cat_img/4.jpeg";
import cat5 from "../assets/cat_img/5.jpg";
import cat6 from "../assets/cat_img/6.jpg";
import cat7 from "../assets/cat_img/7.jpeg";

// some mock cats as objects since there is no connection to the database yet
const cats = [{
    id: 1,
    name: 'Matar',
    breed: 'Arabian Mau',
    gender: 'Female',
    region: 'Kadiköy',
    images: [matar1, matar2, matar3, matar4, matar5],
    about: 'Matar is a young playful cat. She was born on a rainy night in Jerusalem and was the only one of her siblings to survive. So she grew up as an only child, but was very cared for by her mother and her human roommates. She loves other people, is very curious and cuddly.',
    age: 2,
    indoorCat: 'yes',
    size: 'medium',
    coatLength: 'medium',
    canLiveWith: 'other cats & children',
    disease: 'none',
    shelter: {
        name: 'Kadıköy Shelter',
        address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
        website: 'no Website available',
        email: 'shelter.rasimpasa@gmail.com',
        phone: '(090)123456789'
    }
}, {
    id: 2,
    name: 'Whiskers',
    breed: 'Siamese',
    gender: 'Female',
    region: 'Kadiköy',
    images: [cat2],
    shelter: {
        name: 'Kadıköy Shelter',
        address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
        website: 'no Website available',
        email: 'shelter.rasimpasa@gmail.com',
        phone: '(090)123456789'
    }
}, {
    id: 3,
    name: 'Snowball',
    breed: 'Maine Coon',
    gender: 'Female',
    region: 'Beşiktaş',
    images: [cat3],
    shelter: {
        name: 'Kadıköy Shelter',
        address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
        website: 'no Website available',
        email: 'shelter.rasimpasa@gmail.com',
        phone: '(090)123456789'
    }
}, {
    id: 4,
    name: 'Mittens',
    breed: 'Ragdoll',
    gender: 'Male',
    region: 'Şişli',
    images: [cat4],
    shelter: {
        name: 'Kadıköy Shelter',
        address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
        website: 'no Website available',
        email: 'shelter.rasimpasa@gmail.com',
        phone: '(090)123456789'
    }
}, {
    id: 5,
    name: 'Simba',
    breed: 'Bengal',
    gender: 'Male',
    region: 'Üsküdar',
    images: [cat5],
    shelter: {
        name: 'Kadıköy Shelter',
        address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
        website: 'no Website available',
        email: 'shelter.rasimpasa@gmail.com',
        phone: '(090)123456789'
    }
}, {
    id: 6,
    name: 'Luna',
    breed: 'Scottish Fold',
    gender: 'Female',
    region: 'Kadıköy',
    images: [cat6],
    shelter: {
        name: 'Kadıköy Shelter',
        address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
        website: 'no Website available',
        email: 'shelter.rasimpasa@gmail.com',
        phone: '(090)123456789'
    }
}, {
    id: 7,
    name: 'Max',
    breed: 'Sphynx',
    gender: 'Male',
    region: 'Beyoğlu',
    images: [cat7],
    shelter: {
        name: 'Kadıköy Shelter',
        address: 'Rasimpaşa, İskele Sk. no:74/A, 34716 Kadıköy/İstanbul',
        website: 'no Website available',
        email: 'shelter.rasimpasa@gmail.com',
        phone: '(090)123456789'
    }
}];

export default cats;