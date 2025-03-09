import Navbar from './Navbar';

/**
 * Header component that contains the navigation bar
 * @component
 * @returns {JSX.Element} A header element containing the Navbar component
 * @example
 * return (
 *   <Header />
 * )
 */
const Header = () => {
  return (
    <header className="w-full">
      <Navbar />
    </header>
  );
};

export default Header;