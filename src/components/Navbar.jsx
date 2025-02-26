import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold">MyBrand</a>
  
          {/* Mobile Menu Button */}
          <button
            className="md:hidden block"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
  
          {/* Navigation Links */}
          <ul
            className={`md:flex gap-6 absolute md:static top-24 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent p-4 md:p-0 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>
    );
};

export default Navbar;