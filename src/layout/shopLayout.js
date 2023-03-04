import React from "react";
import Navbar from "../components/navbar";
import ShopDisplay from "../components/shopDisplay";
import Footer from "./../components/footer/index";

function ShopLayout(props) {
  return (
    <div
      style={{ minHheight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <ShopDisplay />
      <Footer />
    </div>
  );
}

export default ShopLayout;
