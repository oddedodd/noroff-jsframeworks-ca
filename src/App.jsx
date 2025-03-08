import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <ProductList />
      </div>
    </SearchProvider>
  );
}

export default App;
