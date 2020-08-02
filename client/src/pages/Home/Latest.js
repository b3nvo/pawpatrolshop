import React from "react";
import "./Latest.css";
import { Card, Container, Row, Col } from "react-bootstrap";

class Latest extends React.Component {
    async componentDidMount() {
        console.log("hello");

        this.props.fetchProducts();
    }

    render() {
        return (
            <>
                {this.props.products.map((el) => (
                    <Col xs="4" className="col-card">
                        <Card className="card" key={el._id}>
                            <Card.Img variant="top" src={el.imagePath} />
                            <Card.Body>
                                <Card.Title>{el.name}</Card.Title>
                                <Card.Text>{el.description} </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </>
        );
    }
}

export default Latest;
