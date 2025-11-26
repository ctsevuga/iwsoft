import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const hoverEffect = {
  whileHover: {
    scale: 1.05,
    boxShadow: "0px 20px 30px rgba(0,0,0,0.2)",
    transition: { duration: 0.3 },
  },
};

const colors = [
  "linear-gradient(135deg, #FFB75E, #ED8F03)",
  "linear-gradient(135deg, #43C6AC, #191654)",
  "linear-gradient(135deg, #F7971E, #FFD200)",
  "linear-gradient(135deg, #FF5F6D, #FFC371)",
  "linear-gradient(135deg, #36D1DC, #5B86E5)",
];

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products/summary");
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box height="70vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!products.length)
    return (
      <Typography textAlign="center" mt={6}>
        No products found.
      </Typography>
    );

  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h3"
        sx={{ mb: 6, textAlign: "center", fontWeight: "bold" }}
      >
        Our Products
      </Typography>

      <Grid container spacing={4} justifyContent="center">
  {products.map((product, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
      <motion.div
        variants={fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.15 }}
        {...hoverEffect}
      >
        {/* FULL CARD CLICKABLE */}
        <Link
          to={`/product/${product.slug}`}
          style={{ textDecoration: "none" }}
        >
          <Paper
            elevation={6}
            sx={{
              width: "100%",
              maxWidth: "100%",
              borderRadius: 3,
              overflow: "hidden",
              color: "#fff",
              background: colors[index % colors.length],
              display: "flex",
              flexDirection: "column",
              minHeight: 300,
              cursor: "pointer",
              position: "relative",
            }}
          >
            {/* Banner Image */}
            {product.bannerImage && (
              <Box
                component="img"
                src={product.bannerImage}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: 140,
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            )}

            {/* Content */}
            <Box sx={{ p: 3, flexGrow: 1 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  mb: 1,
                  wordBreak: "break-word",
                  lineHeight: 1.2,
                  color: "#fff",
                }}
              >
                {product.name}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                  color: "#fff",
                }}
              >
                {product.shortDescription}
              </Typography>
            </Box>

            {/* Optional badge */}
            {product.category && (
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: 12,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "#fff",
                }}
              >
                {product.category}
              </Box>
            )}
          </Paper>
        </Link>
      </motion.div>
    </Grid>
  ))}
</Grid>

    </Container>
  );
};

export default ProductsScreen;
