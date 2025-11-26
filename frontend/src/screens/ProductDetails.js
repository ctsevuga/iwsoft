import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Typography,
  Chip,
  Grid,
  Card,
  Button,
} from "@mui/material";

import {
  FaGlobe,
  FaGooglePlay,
  FaApple,
  FaCheckCircle,
  FaCubes,
  FaListAlt,
  FaBoxes,
  FaTasks,
} from "react-icons/fa";

import Slider from "react-slick";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${slug}`);
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };
    loadProduct();
  }, [slug]);

  if (!product) return <p style={{ padding: 20 }}>Loading...</p>;

  // Carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2800,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  // Random icon list fallback
  const iconList = [
    <FaCubes color="#1976d2" size={35} />,
    <FaListAlt color="#9c27b0" size={35} />,
    <FaBoxes color="#ff9800" size={35} />,
    <FaTasks color="#4caf50" size={35} />,
  ];

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", pb: 5 }}>
      
      {/* 🌈 HERO BANNER WITH OVERLAY */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          width: "100%",
          height: { xs: 250, md: 400 },
          borderRadius: 4,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${product.bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          px: 2,
          mb: 4,
          boxShadow: "0px 8px 26px rgba(0,0,0,0.35)",
        }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Typography variant="h3" fontWeight="bold">
            {product.name}
          </Typography>
          <Typography sx={{ maxWidth: 700, mt: 2 }}>
            {product.shortDescription}
          </Typography>
        </motion.div>
      </Box>
        
      {/* CATEGORY CHIP */}
      <Chip
        label={product.category}
        sx={{
          background:
            "linear-gradient(45deg, #1976d2, #42a5f5)",
          color: "#fff",
          fontWeight: "bold",
          display: "block",
          margin: "auto",
          fontSize: "1rem",
          px: 2,
          py: 1,
          mb: 4,
        }}
      />

      {/* LONG DESCRIPTION */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <Typography
          variant="body1"
          sx={{
            mb: 5,
            whiteSpace: "pre-line",
            color: "#444",
            lineHeight: 1.8,
            px: { xs: 2, md: 0 },
          }}
        >
          {product.longDescription}
        </Typography>
      </motion.div>

      {/* FEATURES */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#1976d2",
          mb: 2,
        }}
      >
        Key Features
      </Typography>

      <Grid container spacing={3}>
        {product.features.map((f, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, #e3f2fd, #e0f7fa)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                }}
              >
                {f.iconUrl ? (
                  <img
                    src={f.iconUrl}
                    alt={f.title}
                    style={{
                      width: 50,
                      height: 50,
                      marginBottom: 10,
                    }}
                  />
                ) : (
                  iconList[idx % iconList.length]
                )}

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  {f.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#333" }}>
                  {f.description}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

{/* SCREENSHOT CAROUSEL */}
<Typography
  variant="h4"
  sx={{
    fontWeight: "bold",
    color: "#1976d2",
    mt: 6,
    mb: 2,
  }}
>
  Screenshots
</Typography>

<Box
  sx={{
    width: "100%",
    maxWidth: "550px",
    margin: "auto",
    position: "relative",
    borderRadius: 4,
    p: 2,
    boxShadow: "0 6px 25px rgba(0,0,0,0.25)",
    background: "#fff",
  }}
>
  <Slider
    dots={true}
    infinite={true}
    autoplay={true}
    autoplaySpeed={1500}   // 🔥 Faster sliding
    speed={400}            // 🔥 Smoother animation
    slidesToShow={1}
    slidesToScroll={1}
    arrows={true}          // 🔥 Shows arrows
    nextArrow={
      <div
        style={{
          position: "absolute",
          right: "-20px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "30px",
          cursor: "pointer",
          color: "#1976d2",
          zIndex: 9,
        }}
      >
        ➤
      </div>
    }
    prevArrow={
      <div
        style={{
          position: "absolute",
          left: "-20px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "30px",
          cursor: "pointer",
          color: "#1976d2",
          zIndex: 9,
        }}
      >
        ←
      </div>
    }
  >
    {product.screenshots.map((img, idx) => (
      <Box key={idx} sx={{ textAlign: "center" }}>
        <img
          src={img}
          alt={`Screenshot ${idx + 1}`}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "812px",
            borderRadius: "15px",
            objectFit: "contain",
            margin: "auto",
          }}
        />
      </Box>
    ))}
  </Slider>
</Box>





      {/* PLATFORM BUTTONS */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#1976d2",
          mt: 6,
          mb: 2,
        }}
      >
        Platform Links
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {product.name !== "Nutritionist" && product.platformDetails.webUrl && (
  <Button
    variant="contained"
    startIcon={<FaGlobe />}
    href={product.platformDetails.webUrl}
    target="_blank"
    sx={{
      background: "linear-gradient(45deg, #1976d2, #42a5f5)",
      px: 3,
      py: 1.2,
      borderRadius: 3,
    }}
  >
    Website
  </Button>
)}


        {product.platformDetails.playStoreUrl && (
          <Button
            variant="contained"
            startIcon={<FaGooglePlay />}
            href={product.platformDetails.playStoreUrl}
            target="_blank"
            sx={{
              background:
                "linear-gradient(45deg, #43a047, #66bb6a)",
              px: 3,
              py: 1.2,
              borderRadius: 3,
            }}
          >
            Play Store
          </Button>
        )}

        {product.platformDetails.iosAppUrl && (
          <Button
            variant="contained"
            startIcon={<FaApple />}
            href={product.platformDetails.iosAppUrl}
            target="_blank"
            sx={{
              background:
                "linear-gradient(45deg, #424242, #757575)",
              px: 3,
              py: 1.2,
              borderRadius: 3,
            }}
          >
            iOS App
          </Button>
        )}
      </Box>
      <hr></hr>
            <Box
              sx={{
                width: "100%",
                py: 6,
                px: 3,
                background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                color: "#fff",
                boxShadow: "0px -5px 20px rgba(0,0,0,0.3)",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  textShadow: "0 0 10px rgba(0,0,0,0.4)",
                }}
              >
                Karaikudi Market Chettinadu
              </Typography>
      
              <Typography
                variant="h6"
                sx={{
                  maxWidth: 800,
                  lineHeight: 1.6,
                  opacity: 0.95,
                  mb: 4,
                }}
              >
                Explore our Chettinadu-based market platform with direct access to our
                web application and Android mobile app.
              </Typography>
      
              <Box display="flex" gap={3} flexWrap="wrap" justifyContent="center">
                {/* Web App Button */}
                <a
                  href="https://infowisdomqa.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      px: 4,
                      py: 1.8,
                      fontSize: "1.1rem",
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #ff8800, #ff5722)",
                      color: "#fff",
                      fontWeight: "bold",
                      boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "scale(1.07)",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                      },
                    }}
                  >
                    🌐 Open Web Application
                  </Box>
                </a>
      
                {/* Play Store Button */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.rwithpower.karaikudiEMarket"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      px: 4,
                      py: 1.8,
                      fontSize: "1.1rem",
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #00c853, #009624)",
                      color: "#fff",
                      fontWeight: "bold",
                      boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "scale(1.07)",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                      },
                    }}
                  >
                    📱 Get the App (Play Store)
                  </Box>
                </a>
              </Box>
            </Box>
            <hr></hr>
            {/* GARMENTS & TEXTILES SECTION */}
      <Box
        sx={{
          width: "100%",
          py: 6,
          px: 3,
          background: "linear-gradient(135deg, #4a148c, #7b1fa2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          mt: 4,
          boxShadow: "0px -5px 20px rgba(0,0,0,0.3)",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textShadow: "0 0 10px rgba(0,0,0,0.4)",
          }}
        >
          Garments & Textiles
        </Typography>
      
        <Typography
          variant="h6"
          sx={{
            maxWidth: 800,
            opacity: 0.95,
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          Manage garments, textile units, materials, clients, and operations.  
          Access the full application through the link below.
        </Typography>
      
        {/* Web App Button */}
        <a
          href="https://iwsoftgarments.shop/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Box
            sx={{
              px: 4,
              py: 1.8,
              fontSize: "1.1rem",
              borderRadius: 3,
              background: "linear-gradient(135deg, #ff9800, #f57c00)",
              color: "#fff",
              fontWeight: "bold",
              boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.07)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
              },
            }}
          >
            🌐 Open Garments & Textiles App
          </Box>
        </a>
      
        {/* Credentials */}
        <Box
          sx={{
            mt: 5,
            width: "100%",
            maxWidth: 700,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 3,
            p: 4,
            backdropFilter: "blur(6px)",
            boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
            Login Credentials
          </Typography>
      
          {/* Admin */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight={600}>Admin</Typography>
            <Typography>📱 Phone: 1234567890</Typography>
            <Typography>🔑 Password: Admin@123</Typography>
          </Box>
      
          {/* Client */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight={600}>Client</Typography>
            <Typography>📱 Phone: 9876543210</Typography>
            <Typography>🔑 Password: Client@123</Typography>
          </Box>
      
          {/* Unit Manager */}
          <Box>
            <Typography variant="h6" fontWeight={600}>Unit Manager</Typography>
            <Typography>📱 Phone: 9876543212</Typography>
            <Typography>🔑 Password: UnitManager@123</Typography>
          </Box>
        </Box>
      </Box>
      {/* NUTRITIONIST APP SECTION */}
      <Box
        sx={{
          width: "100%",
          py: 6,
          px: 3,
          background: "linear-gradient(135deg, #2e7d32, #66bb6a)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          mt: 4,
          boxShadow: "0px -5px 20px rgba(0,0,0,0.3)",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textShadow: "0 0 10px rgba(0,0,0,0.4)",
          }}
        >
          Nutritionist
        </Typography>
      
        <Typography
          variant="h6"
          sx={{
            maxWidth: 800,
            opacity: 0.95,
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          Track client progress, manage diets, monitor health parameters,  
          and access your nutrition management dashboard online.
        </Typography>
      
        {/* Web App Button */}
        <a
          href="https://nutritiontrack.shop"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Box
            sx={{
              px: 4,
              py: 1.8,
              fontSize: "1.1rem",
              borderRadius: 3,
              background: "linear-gradient(135deg, #00c853, #009624)",
              color: "#fff",
              fontWeight: "bold",
              boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.07)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
              },
            }}
          >
            🌐 Open Nutritionist App
          </Box>
        </a>
      
        {/* Credentials */}
        <Box
          sx={{
            mt: 5,
            width: "100%",
            maxWidth: 700,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 3,
            p: 4,
            backdropFilter: "blur(6px)",
            boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
            Login Credentials
          </Typography>
      
          {/* Admin */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight={600}>Admin</Typography>
            <Typography>📱 Phone: 1234567890</Typography>
            <Typography>🔑 Password: Admin@123</Typography>
          </Box>
      
          {/* Client */}
          <Box>
            <Typography variant="h6" fontWeight={600}>Client</Typography>
            <Typography>📱 Phone: 9876543210</Typography>
            <Typography>🔑 Password: Client@123</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
    
  );
};

export default ProductDetails;
