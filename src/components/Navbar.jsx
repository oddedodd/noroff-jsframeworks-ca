import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-blue-600">
          ShopLogo
        </a>

        {/* Search - Center on desktop, with cart on mobile */}
        <div className="flex items-center gap-4 md:absolute md:left-1/2 md:-translate-x-1/2">
          <SearchBar />
          <div className="md:hidden">
            <a href="#" className="text-gray-700 hover:text-blue-600">
              <ShoppingCart size={28} />
            </a>
          </div>
        </div>

        {/* Navigation Links and Cart for Desktop / Menu Button for Mobile */}
        <div className="flex items-center gap-4">
          {/* Navigation Links */}
          <div
            className={`flex flex-col md:flex-row md:items-center md:gap-6 absolute md:static bg-white w-full md:w-auto left-0 top-16 md:top-auto transition-transform transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 p-4 md:p-0 shadow-md md:shadow-none`}
          >
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Products
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Contact
            </a>
          </div>

          {/* Cart Icon - Desktop Only */}
          <div className="hidden md:block">
            <a href="#" className="text-gray-700 hover:text-blue-600">
              <ShoppingCart size={28} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
