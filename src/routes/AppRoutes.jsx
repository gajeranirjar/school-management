import { createBrowserRouter, createRoutesFromElements, Route, } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PrivateRoute from "../components/UI/PrivateRoute";
import RoleRedirect from "../components/UI/RoleRedirect";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ErrorPage } from "../pages/ErrorPage";

import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";

import ApproveStudents from "../pages/admin/ApproveStudents";
import ManageTeachers from "../pages/admin/ManageTeachers";

import TeacherAppointments from "../pages/teacher/TeacherAppointments";
import TeacherMessages from "../pages/teacher/TeacherMessages";

import BookAppointment from "../pages/student/BookAppointment";
import StudentMessages from "../pages/student/StudentMessages";

import { ROLES } from "../constants/roles";
import UserDashboard from "../pages/UserDashboard";
import StudentAppointments from "../pages/student/studentAppointments";

const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />} errorElement={<ErrorPage />}>
      <Route index element={<RoleRedirect />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="user" element={<UserDashboard />} />

      {/* ADMIN */}
      <Route
        path="admin"
        element={
          <PrivateRoute allowedRole={ROLES.ADMIN}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/approve-students"
        element={
          <PrivateRoute allowedRole={ROLES.ADMIN}>
            <ApproveStudents />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/manage-teachers"
        element={
          <PrivateRoute allowedRole={ROLES.ADMIN}>
            <ManageTeachers />
          </PrivateRoute>
        }
      />

      {/* TEACHER */}
      <Route
        path="teacher"
        element={
          <PrivateRoute allowedRole={ROLES.TEACHER}>
            <TeacherAppointments />
          </PrivateRoute>
        }
      />
      <Route
        path="teacher/messages"
        element={
          <PrivateRoute allowedRole={ROLES.TEACHER}>
            <TeacherMessages />
          </PrivateRoute>
        }
      />

      {/* STUDENT */}
      <Route
        path="student"
        element={
          <PrivateRoute allowedRole={ROLES.STUDENT}>
            <StudentDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="student/book-appointment"
        element={
          <PrivateRoute allowedRole={ROLES.STUDENT}>
            <BookAppointment />
          </PrivateRoute>
        }
      />
      <Route
        path="student/appointment"
        element={
          <PrivateRoute allowedRole={ROLES.STUDENT}>
            <StudentAppointments />
          </PrivateRoute>
        }
      />
      <Route
        path="student/messages"
        element={
          <PrivateRoute allowedRole={ROLES.STUDENT}>
            <StudentMessages />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export default AppRoutes;