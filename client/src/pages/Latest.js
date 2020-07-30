import React from "react";
import "./Latest.css";
import {Card} from 'react-bootstrap';

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

  handleSubmit(key) {
    console.log(key);
  }

  render() {
    return (
      <div className="producs">
        <h1> Latest products </h1>
        <div className="items">
          {this.state.products.map(el => (
            <Card className="card" onClick={this.handleSubmit(el._id)}>
              <Card.Img variant="top" src={el.imagePath} />
              <Card.Body>
                <Card.Title>{el.name}</Card.Title>
                <Card.Text>
                  {el.description}
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
