import React from "react";
import { Link } from "react-router-dom";
import FolioLogo from "../assets/folio_logo.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-24 py-2 mb-6 bg-white text-black border-b border-gray-300">
      <Link to="/" className="flex items-center space-x-2">
        <img src={FolioLogo} alt="Folio Logo" className="h-10" />
        <h1 className="text-lg font-semibold">Folio</h1>
      </Link>
      <div>
        <Link
          to="/register"
          className="text-lg px-3 py-1 hover:bg-gray-100 rounded"
        >
          Home
        </Link>
        <Link
          to="/login"
          className="text-lg px-3 py-1 hover:bg-gray-100 rounded"
        >
          Portfolio
        </Link>
        <Link
          to="/register"
          className="text-lg px-3 py-1 hover:bg-gray-100 rounded"
        >
          Chat
        </Link>
        <Link
          to="/login"
          className="text-lg px-3 py-1 hover:bg-gray-100 rounded"
        >
          Ventures
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
