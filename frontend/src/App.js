import './css/App.css';   // <-- Add this
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideNav from "./components/SideNav";
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ProductDetails from "./screens/ProductDetails";
import ContactForm from "./screens/ContactForm";
import AdminMessages from "./screens/AdminMessages";
import MessageDetail from './screens/MessageDetail';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function App() {
  return (
    <BrowserRouter>
      <Header />
      <SideNav />
      <div className="content-with-sidenav">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products" element={<ProductsScreen />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/contactList" element={<AdminMessages />} />
          <Route path="/admin/messages/:id" element={<MessageDetail />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
