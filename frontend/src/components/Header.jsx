import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FaBars, FaTimes, FaHome, FaBox, FaEnvelope, FaListAlt } from "react-icons/fa";
import "../css/App.css";

const Header = () => {
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products/summary");
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <header className="header shadow">
      <nav className="navbar">

        {/* Brand Logo / Name */}
        <Link to="/" className="nav-brand">
          <span className="brand-text">IwSoft</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        {/* Navigation Links */}
        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>

          {/* Home */}
          <li>
            <Link
              to="/"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              <FaHome className="icon" /> Home
            </Link>
          </li>

          {/* All Products */}
          <li>
            <Link
              to="/products"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              <FaBox className="icon" /> All Products
            </Link>
          </li>

          {/* Auto-generated product links */}
          {products.map((product) => (
            <li key={product.name}>
              <Link
                to={`/product/${product.slug}`}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                <FaBox className="icon" /> {product.name}
              </Link>
            </li>
          ))}

          {/* NEW: Contact Form */}
          <li>
            <Link
              to="/contact"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              <FaEnvelope className="icon" /> Contact
            </Link>
          </li>

          {/* NEW: Contact Messages List */}
          <li>
            <Link
              to="/contactList"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              <FaListAlt className="icon" /> Contact List
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
};

export default Header;
