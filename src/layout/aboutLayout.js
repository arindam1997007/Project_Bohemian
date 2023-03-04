import React from "react";
import Navbar from "../components/navbar";
import Footer from "./../components/footer/index";
import AboutDisplay from "../components/aboutDisplay";

function AboutLayout(props) {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <AboutDisplay />
      <Footer />
    </div>
  );
}

export default AboutLayout;
