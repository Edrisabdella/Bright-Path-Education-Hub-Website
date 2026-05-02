import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-800">Bright Path</Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/courses" className="text-gray-700 hover:text-yellow-500">Courses</Link>
          <Link to="/resources" className="text-gray-700 hover:text-yellow-500">Resources</Link>
          <Link to="/tutors" className="text-gray-700 hover:text-yellow-500">Tutors</Link>
          <Link to="/about" className="text-gray-700 hover:text-yellow-500">About</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-700">Dashboard</Link>
              <button onClick={handleLogout} className="text-red-500">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-indigo-600 text-white px-4 py-1 rounded">Login</Link>
              <Link to="/register" className="bg-green-600 text-white px-4 py-1 rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;