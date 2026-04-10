
## Certification
<img width="1108" height="825" alt="image" src="https://github.com/user-attachments/assets/76956e0c-25f4-4470-b8b2-8b61ca643909" />

# Library App

A full-stack **Library Management System** built with **Spring Boot** and **ReactJS + TypeScript**.

## Tech Stack

### Frontend

* ReactJS
* TypeScript
* React Router
* Stripe Integration

### Backend

* Spring Boot
* Spring MVC
* Spring Security
* MySQL

### Other

* Auth0 (Authentication)
* Stripe (Payment)
* RESTful API

## Features

### User

* Browse books
* Borrow books
* View book details
* Login / Register
* Ask & answer questions

### Admin

* Manage books (CRUD)
* View user requests
* Respond to questions

## UI Screenshots

### Login

<img src="doc/images/login-with-Auth0-1.png" width="800"/>

### Admin - Manage Books

<img src="doc/images/admin-manage-book-crud-1.png" width="800"/>

### Admin - Book Detail

<img src="doc/images/admin-manage-detail-book-1.png" width="800"/>

<img src="doc/images/admin-manage-detail-book-2.png" width="800"/>

### Admin - Response

<img src="doc/images/admin-response-1.png" width="800"/>

### User - Borrow Book

<img src="doc/images/user-borrow-book-1.png" width="800"/>

### User - Not Login

<img src="doc/images/user-not-login-1.png" width="800"/>

<img src="doc/images/user-not-login-2.png" width="800"/>

### User - Book Detail (Not Login)

<img src="doc/images/user-not-login-detail-1.png" width="800"/>

<img src="doc/images/user-not-login-detail-2.png" width="800"/>

### User - Ask Question

<img src="doc/images/user-request-question-1.png" width="800"/>

### User - View Answer

<img src="doc/images/user-response-answer-1.png" width="800"/>

### User - Shelf

<img src="doc/images/user-shelf-1.png" width="800"/>

## Installation & Run

### Clone project

```bash
git clone https://github.com/JosephHieu/library-app.git
cd library-app
```

### Run Backend

```bash
cd 02-backend/spring-boot-library
./mvnw spring-boot:run
```

### Run Frontend

```bash
cd 03-frontend
npm install
npm start
```

👉 Frontend: http://localhost:3000
👉 Backend: http://localhost:8080


## 📂 Project Structure

```
library-app/
│
├── 01-starter-files/
├── 02-backend/
│   └── spring-boot-library/
├── 03-frontend/
├── doc/
│   └── images/
├── README.md
```

## Future Improvements

* Dockerize application
* CI/CD pipeline
* Improve UI/UX

## Author

**Hieu Nguyen**

## ⭐ If you like this project

Give it a ⭐ on GitHub!


Give it a ⭐ on GitHub!


