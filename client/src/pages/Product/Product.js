import React from 'react';
import {withRouter} from 'react-router-dom';
import './Product.css';

class Product extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="product-page">
                <h1>Product page</h1>
            </div>
        )
    }
}

export default withRouter(Product);