import React from 'react';

export default class Products extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            products: []
        }
    }

    render() {
        return(
            <h1> all products </h1>
        )
    }
}