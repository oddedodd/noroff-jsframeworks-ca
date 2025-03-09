import Header from './Header';
import Footer from './Footer';

/**
 * Layout component that provides the page structure with header, main content area and footer
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render in the main content area
 * @returns {JSX.Element} A page layout with header, main content and footer
 * @example
 * return (
 *   <Layout>
 *     <HomePage />
 *   </Layout>
 * )
 */
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;