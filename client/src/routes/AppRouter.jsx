import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/general/Home';
import About from '../pages/general/About';
import Contact from '../pages/general/Contact';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import CoursesList from '../pages/courses/CoursesList';
import CourseDetail from '../pages/courses/CourseDetail';
import ResourcesList from '../pages/resources/ResourcesList';
import TutorsList from '../pages/tutoring/TutorsList';
import ProtectedRoute from '../components/common/ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';

const AppRouter = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/courses" element={<CoursesList />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/resources" element={<ResourcesList />} />
      <Route path="/tutors" element={<TutorsList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  </Routes>
);

export default AppRouter;