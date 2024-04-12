CREATE TABLE Cats (
    cat_id INT PRIMARY KEY,
    cat_name VARCHAR(50),
    breed VARCHAR(50),
    age INT NOT NULL,
    gender VARCHAR(10),
    color VARCHAR(20),
    shelter_id int,

    FOREIGN KEY(shelter_id) REFERENCES Shelters (shelter_id)
);


SELECT* FROM Cats;

DROP TABLE Cats;

INSERT INTO Cats (cat_id, cat_name, breed, age, gender, color, shelter_id)
VALUES (1001 , 'Whiskers', 'Siamese', 3, 'Female', 'Brown',1001),
(1003, 'Mittens', 'Tabby', 4, 'Female', 'Orange',1001),
(1004, 'Shadow', 'Maine Coon', 5, 'Male', 'Black',1001),
(1006, 'Luna', 'Sphynx', 1, 'Female', 'White',1002),
(1005, 'Smokey', 'Russian Blue', 3, 'Male', 'Gray',1002),
(1007, 'Tiger', 'Bengal', 2, 'Male', 'Orange',1002),
(1008, 'Oreo', 'Domestic Shorthair', 6, 'Female', 'Black and White',1002),
(1009, 'Simba', 'Lion', 8, 'Male', 'Golden',1006),
(1010, 'Cleo', 'Calico', 2, 'Female', 'Calico',1006),
(1011, 'Max', 'Ragdoll', 4, 'Male', 'Seal Point',1006);



CREATE TABLE Profile (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    full_name VARCHAR(100),
    address VARCHAR(255),
    phone_number VARCHAR(20),
);

SELECT * FROM Profile;

DROP TABLE Cats;


CREATE TABLE Admin (
    admin_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    full_name VARCHAR(100),
);

SELECT * FROM Admin;

DROP TABLE Admin;

INSERT INTO Admin (admin_id, username, password, full_name)
VALUES (1, 'adminKayra', 'password123', 'Kayra'),
(2, 'adminLena', 'adminpass', 'Lena'),
(3, 'adminMert', 'securepassword', 'Mert'),
(4, 'adminSerkan', 'password', 'Serkan');




CREATE TABLE Shelters (
    shelter_id INT PRIMARY KEY,
    shelter_name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    website_url VARCHAR(255),
);

SELECT * FROM Shelters;

DROP TABLE Shelters;


INSERT INTO Shelters (shelter_id, shelter_name, location, website_url)
VALUES (1001, 'Happy Paws Animal Shelter', 'Istanbul, Turkey', 'https://happypaws.org'),
(1002, 'Pawsitive Rescue Center', 'Istanbul, Turkey', 'https://pawsitiverescue.org'),
(1003, 'Istanbul Animal Aid', 'Istanbul, Turkey', 'https://istanbulanimalaid.com'),
(1004, 'Stray Haven Istanbul', 'Istanbul, Turkey', 'https://strayhavenistanbul.org'),
(1005, 'Purrfect Paws Sanctuary', 'Istanbul, Turkey', 'https://purrfectpaws.com'),
(1006, 'Hope for Homeless Animals', 'Istanbul, Turkey', 'https://hopeforhomelessanimals.org'),
(1007, 'Furry Friends Foundation', 'Istanbul, Turkey', 'https://furryfriendsfoundation.org'),
(1008, 'Safe Haven Animal Rescue', 'Istanbul, Turkey', 'https://safehavenanimalrescue.org'),
(1009, 'Paws and Claws Adoption Center', 'Istanbul, Turkey', 'https://pawsandclawsadoption.com'),
(1010, 'Feline Friends Istanbul', 'Istanbul, Turkey', 'https://felinefriendsistanbul.com');
