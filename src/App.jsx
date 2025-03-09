import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Contact from './pages/Contact';
import Home from './pages/Home';

import ProductDetails from './components/ProductDetails';
import DisplayCart from './components/DisplayCart';
import Checkout from './components/Checkout';
import Layout from './components/Layout';

import { SearchProvider } from './context/SearchContext';
import { store } from './store/store';

function App() {
  return (
    <SearchProvider>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<DisplayCart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </Provider>
    </SearchProvider>
  );
}

export default App;
