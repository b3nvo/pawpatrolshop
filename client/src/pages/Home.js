import React from "react";
import Menu from "./Menu.js";
import Latest from "./Latest.js";
import CarouselProducts from "../components/Carousel.js";
import { withRouter } from "react-router-dom";
import "./Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: this.props.payload,
      token: this.props.token
    }

    if (this.props.location.state) { 
      this.setState({payload: this.props.location.state.payload, token: this.props.location.state.token});
    }
  }

  render() {
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
}

export default withRouter(Home);
