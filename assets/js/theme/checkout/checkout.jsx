import React from 'react';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';
import Snackbar from 'material-ui/Snackbar';
import Cart from './cart';

export default class CheckoutComponent extends React.Component {
    constructor(props) {
        super(props);

        this.service = createCheckoutService();
        this.state = { isLoading: true };
    }

    componentDidMount() {
        this.service.loadCheckout()
            .then(() => this.setState({ isLoading: false }));

        this.subscriber = this.service.subscribe((state) => {
            this.setState(state);
        });
    }

    render() {
        if (this.state.isLoading) {
            return this._renderLoadingState();
        }

        const { checkout } = this.service.getState();

        return (
            <section>
                <Cart cart={ checkout.getCart() } />
            </section>
        );
    }

    _renderLoadingState() {
        return (
            <Snackbar
                anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
                open={ true }
                message="Loading..." />
        );
    }
}
