import React from 'react';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';
import Snackbar from 'material-ui/Snackbar';
import Billing from './billing';
import Cart from './cart';
import Customer from './customer';
import Shipping from './shipping';

export default class CheckoutComponent extends React.Component {
    constructor(props) {
        super(props);

        this.service = createCheckoutService();
        this.state = { isLoading: true };
    }

    componentDidMount() {
        this.service.loadCheckout()
            .then(() => this.service.loadShippingCountries())
            .then(() => this.service.loadShippingOptions())
            .then(() => this.service.loadBillingCountries())
            .then(() => this.setState({ isLoading: false }));

        this.subscriber = this.service.subscribe((state) => {
            this.setState(state);
        });
    }

    render() {
        if (this.state.isLoading) {
            return this._renderLoadingState();
        }

        const { checkout, errors } = this.service.getState();

        return (
            <section>
                <Cart cart={ checkout.getCart() }/>

                <Customer
                    customer={ checkout.getCustomer() }
                    error={ errors.getSignInError() }
                    onSignIn={(...args) => this._handleSignIn(...args)}
                    onSignOut={(...args) => this._handleSignOut(...args)}/>

                <Shipping
                    address={ checkout.getShippingAddress() }
                    countries={ checkout.getShippingCountries() }
                    options={ checkout.getShippingOptions() }
                    selectedOptionId={ checkout.getSelectedShippingOption() ? checkout.getSelectedShippingOption().id : '' }
                    onSelect={ (...args) => this._handleSelectShippingOption(...args) }
                    onUpdate={ (...args) => this._handleUpdateShippingAddress(...args) } />

                <Billing
                    address={ checkout.getBillingAddress() }
                    countries={ checkout.getBillingCountries() }
                    onUpdate={ (...args) => this._handleUpdateBillingAddress(...args) } />
            </section>
        );
    }

    _renderLoadingState() {
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={true}
                message="Loading..."/>
        );
    }

    _handleSignIn(credentials) {
        this.service.signInCustomer(credentials);
    }

    _handleSignOut() {
        this.service.signOutCustomer();
    }

    _handleSelectShippingOption(addressId, optionId) {
        this.service.selectShippingOption(addressId, optionId, {});
    }

    _handleUpdateShippingAddress(address) {
        this.service.updateShippingAddress(address);
    }

    _handleUpdateBillingAddress(address) {
        this.service.updateBillingAddress(address);
    }
}
