🎓 Student-Teacher Booking Appointment System (React + Firebase)
🌐 Live Demo → https://nirjargajeraschool.netlify.app/

📌 Project Description -> 
The Student-Teacher Booking Appointment System is a role-based web application built using React.js and Firebase.
It allows students to easily search teachers, book appointments, and communicate with them, while teachers can manage appointment requests and interact with students.
The system also includes an Admin panel that manages teachers and student accounts to ensure controlled access.
This project demonstrates real-world architecture using Firebase Authentication, Firestore database, role-based access control, and modular React application structure.

🎯 Objective -> 
The objective of this project is to design and implement a secure appointment booking platform that:
Implements role-based access control (Admin, Teacher, Student)
Uses Firebase Authentication for login and registration
Uses Firestore as a real-time NoSQL database
Allows students to search teachers and book appointments
Allows teachers to approve or cancel appointment requests
Enables messaging between students and teachers
Demonstrates production-level application structure

🛠️ Tech Stack -> 
React.js
React Router
Firebase Authentication
Firebase Firestore
Firestore Security Rules
Material UI
JavaScript (ES6)
CSS3
Netlify Hosting (Deployment)

👥 User Roles ->
✔ Admin
Manage teacher accounts
Add teacher profiles
Update or delete teachers
Activate or deactivate student accounts
View system users

✔ Teacher
Login to teacher dashboard
View all appointment requests
Approve or cancel appointment requests
View student messages
Manage scheduled appointments

✔ Student
Register and login
Search teachers by department or subject
Book appointments with teachers
Send messages to teachers
View appointment status

✔ User
Register and login
Access personal dashboard
Wait for role assignment

✨ Features ->
✔ Authentication
Secure registration and login using Firebase Authentication
User profile stored in Firestore database
Role-based redirection after login

✔ Role-Based Access Control
Protected routes using PrivateRoute
Role validation in frontend
Database access control using Firestore Security Rules

✔ Admin Panel
Create teacher accounts
Update teacher information
Delete teacher accounts
Activate or deactivate students using isActive flag

✔ Teacher Dashboard
View appointment requests from students
Approve or cancel appointment requests
View scheduled appointments
Access student messages

✔ Student Dashboard
Search teachers by subject or department
Book appointment with selected teacher
Send messages to teachers
Track appointment status (pending / approved / cancelled)

✔ Appointment Management
Students can create appointment requests
Teachers can approve or cancel requests
Appointment status updates in real-time

✔ Messaging System
Students can send messages to teachers
Teachers can view and respond to student messages

✔ UI/UX
Responsive dashboard interface
Material UI components
Clean and modular layout structure
User feedback and error handling

📂 Project Structure ->
📦student-teacher-booking
 ┣ 📂public/
 ┣ 📦src
 ┣ 📂components
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜AppLayout.jsx
 ┃ ┃ ┣ 📜Footer.jsx
 ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┗ 📜Loading.jsx
 ┃ ┣ 📂shared
 ┃ ┃ ┣ 📜AppointmentTable.jsx
 ┃ ┃ ┣ 📜StudentApprovalTable.jsx
 ┃ ┃ ┗ 📜TeacherTable.jsx
 ┃ ┗ 📂UI
 ┃ ┃ ┣ 📜PrivateRoute.jsx
 ┃ ┃ ┗ 📜RoleRedirect.jsx
 ┣ 📂config
 ┃ ┗ 📜firebase.js
 ┣ 📂constants
 ┃ ┗ 📜roles.js
 ┣ 📂context
 ┃ ┗ 📜AuthContext.jsx
 ┣ 📂pages
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📜AdminDashboard.jsx
 ┃ ┃ ┣ 📜ApproveStudents.jsx
 ┃ ┃ ┣ 📜ManageTeachers.jsx
 ┃ ┃ ┗ 📜ManageUsers.jsx
 ┃ ┣ 📂student
 ┃ ┃ ┣ 📜BookAppointment.jsx
 ┃ ┃ ┣ 📜StudentAppointments.jsx
 ┃ ┃ ┣ 📜StudentDashboard.jsx
 ┃ ┃ ┗ 📜StudentMessages.jsx
 ┃ ┣ 📂teacher
 ┃ ┃ ┣ 📜TeacherAppointments.jsx
 ┃ ┃ ┗ 📜TeacherMessages.jsx
 ┃ ┣ 📜ErrorPage.jsx
 ┃ ┣ 📜Login.jsx
 ┃ ┣ 📜Register.jsx
 ┃ ┗ 📜UserDashboard.jsx
 ┣ 📂routes
 ┃ ┗ 📜AppRoutes.jsx
 ┣ 📂services
 ┃ ┣ 📜adminService.js
 ┃ ┣ 📜appointmentService.js
 ┃ ┣ 📜authService.js
 ┃ ┣ 📜logService.js
 ┃ ┣ 📜messageService.js
 ┃ ┗ 📜teacherService.js
 ┣ 📂utils
 ┃ ┣ 📜dateUtils.js
 ┃ ┣ 📜redirectRoles.js
 ┃ ┗ 📜validators.js
 ┣ 📜App.css
 ┣ 📜App.jsx
 ┗ 📜main.jsx
 ┣ 📜.env
 ┣ 📜.env.example
 ┣ 📜.gitignore
 ┣ 📜bun.lock
 ┣ 📜eslint.config.js
 ┣ 📜index.html
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜vite.config.js

🚀 How to Run Locally ->
Clone the repository
git clone https://github.com/gajeranirjar/school-management
Navigate to the project folder
cd school-management
Install dependencies
npm install
Start the development server
npm run dev

Open in browser ->
http://localhost:5173

🔑 Firebase Setup ->
1.Create a Firebase project
2.Enable:
Authentication (Email/Password)
Firestore Database
3.Add your Firebase config inside firebase.js
4.Add Firestore Security Rules
5.Run the project

🔐 Security Implementation ->
Role-based Firestore security rules
User activation system using isActive
Admin-only teacher management
Teacher restricted to their own appointments
Students restricted to their own bookings
Database-level access control

📄 License
This project is created for educational purposes.

👤 Author
Nirjar Gajera
GitHub: https://github.com/gajeranirjar