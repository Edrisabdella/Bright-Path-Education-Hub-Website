import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/api';
import { setCourses } from '../../redux/slices/courseSlice';
import { Link } from 'react-router-dom';

const CoursesList = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector(state => state.courses);
  useEffect(() => {
    api.get('/courses').then(res => dispatch(setCourses(res.data)));
  }, []);
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p>{course.description.substring(0, 80)}...</p>
            <Link to={`/courses/${course._id}`} className="text-indigo-600">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CoursesList;