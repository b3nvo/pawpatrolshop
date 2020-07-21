import React from "react";
import "./latest.css";
import {Card} from 'react-bootstrap';
import image from '../images/Iphone-12-Pro-Max.jpg';

class Latest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  async componentDidMount() {
    console.log('hello')
    const response = await fetch("/api/products/latest");
    const json = await response.json();
    this.setState({ products: json.data});
  }

  render() {
    return (
      <div className="producs">
        <h1> Latest products </h1>
        <div className="items">
          {this.state.products.map(el => (
            <Card className="card">
              <Card.Img variant="top" src={el.imagePath} />
              <Card.Body>
                <Card.Title>{el.name}</Card.Title>
                <Card.Text>
                  {el.description}
                  € {el.price}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default Latest;
