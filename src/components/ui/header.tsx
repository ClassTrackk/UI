import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-green-600">ClassTrack</h1>
      <nav className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition">
          Dashboard
        </Link>
        <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium transition">
          Login
        </Link>
        <Link to="/register" className="text-gray-700 hover:text-green-600 font-medium transition">
          Register
        </Link>
      </nav>
    </header>
  );
};
