# 🎓 Student Management System

A full-stack **Student Management System** built using React.js, Spring Boot, and MySQL. The application provides a platform for students to explore courses, enroll in courses, manage their learning activities, and access a personalized dashboard through secure JWT-based authentication.

## 🚀 Features

### 🔐 Authentication & Security
- Student registration and login.
- JWT-based authentication.
- Secure API access.
- Password encryption.
- Role-based authorization.
  
### 📊 Student Dashboard
- Personalized student dashboard.
- Overview of student activities.
- Course statistics.
- Enrollment information.
- Learning progress overview.

### 📚 Course Management
- Explore available courses.
- View course details.
- Enroll in courses.
- Track enrolled courses.
- Manage learning activities.

### 🎯 My Learning
- View enrolled courses.
- Track enrollment status.
- Access learning information.
- Monitor learning progress.

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- REST APIs
- JWT Authentication

### Database
- MySQL

### Tools
- IntelliJ IDEA
- Visual Studio Code
- Postman
- Git
- GitHub

## 🏗️ Project Architecture

```text
Student Management System
│
├── Frontend (React.js)
│   ├── Login & Registration
│   ├── Dashboard
│   ├── Explore Courses
│   ├── My Learning
│   └── API Integration
│
├── Backend (Spring Boot)
│   ├── Controllers
│   ├── Services
│   ├── Repositories
│   ├── Entities
│   ├── Security
│   └── JWT Authentication
│
└── Database (MySQL)
    ├── Users
    ├── Courses
    └── Enrollments
```

## 📂 Project Structure

### Backend

```text
src/main/java
│
└── com.studentmanagement
    ├── controller
    ├── service
    ├── repository
    ├── entity
    ├── security
    ├── config
    └── dto
```

### Frontend

```text
src
│
├── Components
├── Pages
├── RegisterLoginComponents
├── Services
├── Assets
└── App.jsx
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/DRaviteja64/Student-Management-System.git
```

```bash
cd Student-Management-System
```

### 2. Backend Setup

- Open the backend project in IntelliJ IDEA.
- Configure the MySQL database.
- Update the database credentials in `application.properties`.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_management
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

- Run the Spring Boot application.

The backend will run at:

```text
http://localhost:8080
```

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

## 🔑 Authentication Flow

```text
Student
   │
   ▼
React Login / Register
   │
   ▼
Spring Boot REST API
   │
   ▼
Authentication & Validation
   │
   ▼
JWT Token Generation
   │
   ▼
React Frontend
   │
   ▼
Access Protected APIs
```

## 🔄 Application Workflow

1. Students register using their details.
2. Students log in using their credentials.
3. Backend validates user credentials.
4. JWT token is generated after successful authentication.
5. Students access the dashboard.
6. Students explore available courses.
7. Students enroll in courses.
8. Students view their enrolled courses under My Learning.

## 📡 API Modules

| Module | Description |
|---|---|
| Authentication | Student registration and login |
| Overview | Student dashboard information |
| Courses | Explore and retrieve courses |
| Enrollment | Enroll students in courses |
| My Learning | Retrieve student enrolled courses |

## 🔒 Security

- Spring Security integration.
- JWT-based authentication.
- Password encryption.
- Protected REST endpoints.
- Authorization-based API access.
- Authentication token validation.

## 🎯 Future Enhancements

- Admin dashboard.
- Course creation and management.
- Course completion tracking.
- Assignment management.
- Quiz and examination modules.
- Notifications.
- Student performance analytics.

## 👨‍💻 Developer

**Ravi Teja**

- GitHub: [DRaviteja64](https://github.com/DRaviteja64)

---

⭐ If you find this project interesting, feel free to explore the repository!
