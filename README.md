# Kedi-net Istanbul — Istanbul Cat Shelter Database

<img width="1016" height="746" alt="ChatGPT Image 7  Nov  2025, 09_37_34" src="https://github.com/user-attachments/assets/cbf9b0cd-106a-45a2-9411-fbc03dac4f62" />

## Overview

**Kedi-net Istanbul** is a full-stack web application developed as part of the **Software Engineering Project (CMPE356)** at Boğaziçi University.
The project’s goal is to support the care and adoption of stray cats in Istanbul by providing a **centralized online platform** for shelters and users.

**Course:** Software Engineering (CMPE356)
**Project Coordinator:** Dr. Ilktan Ar
**Author & Developer:** Lena Heisel 

---

## Project Goals

### SMART Goals

*  **Database**: At least **500 cats** and **10 shelters**
*  **Filtering & Sorting**: Search and filter cats by attributes
*  **Responsive Design**: Works seamlessly on mobile and desktop
*  **User-Friendly UI**: Simple, modern, and accessible
*  **Multiple Page Types**: Admin and User interfaces

### Overall Objective

> Help with stray cats in Istanbul by creating a single, user-friendly website where all sheltered cats are listed — making it easy for everyone to find their perfect cat. 🐾

---

## Features

### User Features

<img width="1390" height="766" alt="kedi" src="https://github.com/user-attachments/assets/c852629e-8623-49fb-820b-51649fc70d67" />


* Browse all cats from shelters across Istanbul
* Apply **filters** (e.g. breed, color, age, shelter)
* Sort results by various criteria
* View detailed cat profiles without reloading the page
* Create an account and **save favorite cats**

### Admin Features

* Perform **CRUD** (Create, Read, Update, Delete) operations on cats and shelters
* Manage shelter information and cat data

---

##  System Architecture

### Frontend

* **React.js** (JSX)
* **Responsive Design** using CSS
* Fast filtering and dynamic rendering without page reloads

### Backend

* **Java Spring Boot**
* **MySQL Database**
* RESTful APIs for frontend communication

### Design & Modelling

* Functional & non-functional requirements defined
* Class and Sequence Diagrams created using **PlantUML**
* System modeled for scalability and maintainability

---

## Database

* Minimum: 500 cat entries
* Minimum: 10 registered shelters
* Stored in **MySQL** with normalized structure

---

## Achievements

✅ Fully functional full-stack application
✅ Intuitive, modern UI
✅ Implemented CRUD and favorite system
✅ Successful integration between frontend and backend
✅ Extensive use of software modeling techniques

---

## Known Limitations

❌ Location-based search not implemented
❌ Distance to shelter not displayed
❌ Notifications for new cats missing
❌ Passwords stored without encryption (future fix)
❌ Some data (e.g. age → birth year) could be more maintainable

---

## Conclusion

**Kedi-net Istanbul** successfully demonstrates the integration of:

* Full-Stack Web Development
* Software Engineering principles
* UML system modeling
* Real-world application in animal welfare

It provides a strong foundation for future improvements such as location-based features, notification systems, and enhanced data security.

---

## Future Improvements

* Implement **geolocation-based search**
* Add **map integration** to display shelters
* Introduce **email or app notifications** for new cats
* Improve **database security** with encryption
* Add **analytics dashboard** for shelters

---

## Technologies Used

| Layer               | Technology               |
| ------------------- | ------------------------ |
| **Frontend**        | React.js, JSX, HTML, CSS |
| **Backend**         | Java Spring Boot         |
| **Database**        | MySQL                    |
| **Modeling Tools**  | PlantUML                 |
| **Version Control** | GitHub                   |

---

## References

* Sommerville, Ian. *Software Engineering* (10th Edition), Pearson Education Limited, Boston, 2016.
