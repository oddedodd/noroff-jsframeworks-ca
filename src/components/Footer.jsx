import React from 'react';

/**
 * Footer component that displays copyright information
 * @component
 * @returns {JSX.Element} A footer with copyright text
 * @example
 * return (
 *   <Footer />
 * )
 */
const Footer = () => {
  return (
    <footer className="bg-white py-4 bottom-0 w-full">
      <div className="container mx-auto text-center">
        <p className="text-gray-600">© AllStar Avenue 2025</p>
      </div>
    </footer>
  );
};

export default Footer;