import React from "react";
import "./Carousel.css";
import { Carousel } from "react-bootstrap";

export const CarouselProducts = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images-na.ssl-images-amazon.com/images/I/61N3G7aGyPL._UL1200_.jpg"
          height="800px"
          width="auto"
          alt="First slide"
        />
        <Carousel.Caption className="caption">
          <h3>First slide label</h3>
          <p className="price"> € 250,00 </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images-na.ssl-images-amazon.com/images/I/61N3G7aGyPL._UL1200_.jpg"
          height="800px"
          width="auto"
          alt="second slide"
        />

        <Carousel.Caption className="caption">
          <h3>Second slide label</h3>
          <p className="price"> € 600,00 </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src=""
          alt="Third slide"
          src="https://images-na.ssl-images-amazon.com/images/I/61N3G7aGyPL._UL1200_.jpg"
          height="800px"
          width="auto"
        />

        <Carousel.Caption className="caption">
          <h3>Third slide label</h3>
          <p className="price">€ 1250,00</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselProducts;
