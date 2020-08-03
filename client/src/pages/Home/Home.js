import React from "react";
import Latest from "./Latest";
import CarouselProducts from "./Carousel.js";
import { Container, Row } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import "./Home.css";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: this.props.payload,
            token: this.props.token,
            products: []
        };

        if (this.props.location.state) {
            this.setState({
                payload: this.props.location.state.payload,
                token: this.props.location.state.token
            });
        }

        this.fetchProducts = this.fetchProducts.bind(this);
    }

    async fetchProducts() {
        const response = await fetch("/api/products/latest");
        const json = await response.json();
        this.setState({ products: json.data });
    }

    render() {
        const { products } = this.state;

        return (
            <div className="home">
                <div className="carousel">
                    <CarouselProducts />
                </div>

                {/* creating grid view */}
                <div className="products">
                    <h2 className="text-center">Latest products</h2>
                    <Container className="w-100">
                        <Row className="w-100">
                            <Latest fetchProducts={this.fetchProducts} products={products} />
                        </Row>
                    </Container>
                </div>

                <div className="footer">
                    <div className="inline">
                        <div className="float-left m-l-1">
                            <p><b>PawPatrolShop</b> ©    All rights reserved</p>
                        </div>
                        <div className="float-right">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);
