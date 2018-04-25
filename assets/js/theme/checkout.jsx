import PageManager from './page-manager';
import Checkout from '@bigcommerce/checkout-sdk-example';
import React from 'react';
import ReactDOM from 'react-dom';

export default class CheckoutPage extends PageManager {
    loaded(next) {
        ReactDOM.render(<Checkout />, document.getElementById('checkout-app'));

        next();
    }
}
