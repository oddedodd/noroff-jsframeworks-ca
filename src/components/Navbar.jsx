import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";
import { Cart } from './Cart';

/**
 * Navigation bar component that provides site navigation, search, and cart access
 * @component
 * @returns {JSX.Element} A responsive navigation bar with logo, search, links and cart
 * @example
 * return (
 *   <Navbar />
 * )
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        <a href="/" className="text-lg md:text-2xl font-bold text-red-500 flex items-center gap-1 md:gap-2 whitespace-nowrap">
          <ShoppingBag className="w-5 md:w-6 h-5 md:h-6" /> <span>AllStar Avenue</span>
        </a>

        {/* Search Bar  */}
        <div className="hidden md:flex md:absolute md:left-1/2 md:-translate-x-1/2">
          <SearchBar />
        </div>
        {/* Mobile Search Bar */}
        <div className="absolute left-0 right-0 px-4 md:hidden -bottom-14 bg-white pb-4">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4">
      
          <div
            className={`flex flex-col items-center md:flex-row md:items-center md:gap-6 absolute md:static bg-white w-full md:w-auto left-0 top-10 md:top-auto transition-transform transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 p-4 md:p-0 shadow-md md:shadow-none space-y-4 md:space-y-0`}
          >
            <a href="/" className="text-gray-700 hover:text-red-600">
              Home
            </a>
            <a href="/contact" className="text-gray-700 hover:text-red-600">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
