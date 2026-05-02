import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <section className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-32 text-center">
    <h1 className="text-5xl font-bold">Bright Path Education Hub</h1>
    <p className="text-xl mt-4">Learn Smarter, Achieve Higher</p>
    <Link to="/courses" className="inline-block mt-6 bg-yellow-500 text-black px-6 py-3 rounded-full">Explore Courses</Link>
  </section>
);
export default Home;