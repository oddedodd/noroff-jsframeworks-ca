import { Routes, Route } from 'react-router-dom';
import Contact from './pages/Contact';
import About from './pages/About';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import { SearchProvider } from './context/SearchContext';
import { Provider } from 'react-redux';
import { store } from './store/store';
import DisplayCart from './components/DisplayCart';
import Checkout from './components/Checkout';
import Layout from './components/Layout';

function App() {
  return (
    <SearchProvider>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<DisplayCart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </Provider>
    </SearchProvider>
  );
}

export default App;
