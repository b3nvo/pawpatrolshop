import React, { useState } from "react";
import "./latest.css";

class Latest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  handleChange = (data) => {
    this.setState({ products: data });
  };

  componentDidMount() {
    fetch("/api/products/latest", (err, resp) => {
      if (err) console.log("fetch error", err.toString());

      console.log("data :", resp);
      if (resp.message == "OK") {
        this.handleChange(resp.data);
      }
    });
  }

  render() {
    return (
      <div className="producs">
        <h1> products coming here </h1>
      </div>
    );
  }
}

export default Latest;
