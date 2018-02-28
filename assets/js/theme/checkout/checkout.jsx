import React from 'react';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';

export default class CheckoutComponent extends React.Component {
    constructor(props) {
        super(props);

        this.service = createCheckoutService();
    }

    componentDidMount() {
        this.service.loadCheckout()
            .then(({ checkout }) => console.log(checkout.getCart()));
    }

    render() {
        return (
            <section>
                Checkout
            </section>
        );
    }
}
