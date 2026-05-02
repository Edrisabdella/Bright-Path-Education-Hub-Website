import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
      <p>Your learning journey starts here.</p>
    </div>
  );
};
export default Dashboard;