import React from 'react';
import {withRouter} from 'react-router-dom';
import './Product.css';

class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            product: {},
        }
    }

    async componentDidMount() {
        var productId = this.props.match.params.productId;

        // fetch data
        await fetch('/api/products/product/' +  productId)
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({product: data.data})
        })
    }

    render() {
        const { product } = this.state;
        console.log(product);

        return (
            <div className="product-page">
                <div className="float-left m-t-5 m-l-2 hw-50">
                    <img src={product.imagePath} />
                </div>
                <div className="float-right m-t-5 m-r-40">
                    <h3> {product.name} </h3>
                    <div className="description">
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Product);