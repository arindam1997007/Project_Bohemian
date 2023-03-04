import React from "react";
import Navbar from "./../components/navbar/index";
import HomeDisplay from "./../components/homeDisplay/homeDisplay";
import Footer from "./../components/footer/index";

function HomeLayout(props) {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <HomeDisplay />
      <Footer />
    </div>
  );
}

export default HomeLayout;
