import React from "react";
import Menu from "./Menu";
import Latest from "./latest";
import CarouselProducts from "./carousel";
import { withRouter } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="Menu">
        <Menu />
      </div>

      <div className="carousel">
        <CarouselProducts />
      </div>

      <div className="products">
        <Latest />
      </div>

      <div className="footer">
      <h1> footer here </h1>
    </div>
    </div>

    
  );
}

export default withRouter(Home);
