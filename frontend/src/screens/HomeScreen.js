import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Avatar,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCogs,
  FaRocket,
  FaChartLine,
} from "react-icons/fa";

// Fade-up animation
const fadeUp = {
  initial: { opacity: 0, y: 35 },
  animate: { opacity: 1, y: 0 },
};

// Icons for description sections
const sectionIcons = [<FaCogs />, <FaRocket />, <FaChartLine />];

// Hover effect for cards
const hoverEffect = {
  whileHover: {
    scale: 1.05,
    boxShadow: "0px 20px 30px rgba(0,0,0,0.25)",
    transition: { duration: 0.3 },
  },
};

const HomeScreen = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const { data } = await axios.get("/api/company");
        setCompany(data);
      } catch (err) {
        console.error("Error fetching company:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  if (loading) {
    return (
      <Box
        height="70vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!company) return <p>No company info found.</p>;

  // Split description into sections by double line break
  const descriptionSections = company.description
    .split("\n\n")
    .filter((s) => s.trim() !== "");

  // Multi-color gradient array for description cards
  const cardGradients = [
    "linear-gradient(135deg, #1e3c72, #2a5298)",
    "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    "linear-gradient(135deg, #4568dc, #b06ab3)",
    "linear-gradient(135deg, #ff4e50, #f9d423)",
  ];

  return (
    <>
      {/* HERO SECTION */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url(${company.heroImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          px: 2,
        }}
      >
        <motion.div {...fadeUp} transition={{ duration: 1 }}>
          <Avatar
            src={company.logoUrl}
            alt="Company Logo"
            sx={{ width: 120, height: 120, mb: 2, boxShadow: 4 }}
          />
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.3, duration: 1 }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", textShadow: "0 0 15px #000" }}
          >
            {company.name}
          </Typography>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.6, duration: 1 }}>
          <Typography
            variant="h5"
            sx={{
              mt: 2,
              color: "#ffeb3b",
              fontWeight: 500,
              textShadow: "0 0 10px #000",
            }}
          >
            {company.tagline}
          </Typography>
        </motion.div>
      </Box>
            {/* CUSTOM PROMO SECTION */}
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

      
      {/* DESCRIPTION SECTION */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          {descriptionSections.map((section, index) => {
            const lines = section.split("\n");
            const title = lines[0];
            const body = lines.slice(1).join("\n");

            return (
              <Grid item xs={12} md="auto" key={index}>
                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  {...hoverEffect}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      p: 4,
                      borderRadius: 3,
                      display: "flex",
                      flexDirection: "column",
                      maxWidth: 500,
                      minWidth: 300,
                      background: cardGradients[index % cardGradients.length],
                      color: "#fff",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Box fontSize={30}>{sectionIcons[index % sectionIcons.length]}</Box>
                      <Typography variant="h6" fontWeight="bold">
                        {title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: "pre-line",
                        lineHeight: 1.7,
                      }}
                    >
                      {body}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* CONTACT SECTION */}
      <Container sx={{ pb: 8 }}>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeUp}
          {...hoverEffect}
        >
          <Paper
            elevation={6}
            sx={{
              p: 5,
              borderRadius: 3,
              background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#0d47a1" }}
            >
              Contact Us
            </Typography>

            <Grid container spacing={4}>
              {/* Email */}
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={2}>
                  <FaEnvelope size={28} color="#1976d2" />
                  <Typography variant="h6">{company.contact.email}</Typography>
                </Box>
              </Grid>

              {/* Address */}
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={2}>
                  <FaMapMarkerAlt size={28} color="#ef5350" />
                  <Typography
                    variant="h6"
                    sx={{ whiteSpace: "pre-line" }}
                  >
                    {company.contact.address}
                  </Typography>
                </Box>
              </Grid>

              {/* Social Links */}
              {company.socialLinks.linkedin && (
                <Grid item xs={12}>
                  <Box mt={3}>
                    <IconButton
                      component="a"
                      href={company.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: "#0e76a8",
                        fontSize: "2.5rem",
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.2)" },
                      }}
                    >
                      <FaLinkedin />
                    </IconButton>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </>
  );
};

export default HomeScreen;
