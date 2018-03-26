import React from 'react';
import TextField from 'material-ui/TextField';
import { CvvMask } from './cvv-mask';
import { MonthYearMask } from './month-year-mask';

export default class PaymentFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            creditCard: {
                ccNumber: '',
                ccName: '',
                ccCvv: '',
                ccExpiry: {
                    month: '',
                    year: '',
                },
                ccType: 'visa',
            },
            expiryDate: '',
        };
    }

    componentWillReceiveProps({ creditCard = {} }) {
        if (this.props.creditCard !== creditCard) {
            const { month, year } = creditCard.ccExpiry;
            const expiryDate = `${month}/${year}`;

            this.setState({ creditCard, expiryDate });
        }
    }

    render() {
        return (
            <div>
                <TextField
                    label="Credit Card Number"
                    value={ this.state.creditCard.ccNumber || '' }
                    onChange={ this._handleCreditCardChange('ccNumber') }
                    autoComplete="cc-number"
                    margin="normal"
                    required />

                <TextField
                    label="Expiration"
                    InputProps={ { inputComponent: MonthYearMask } }
                    value={ this.state.expiryDate || '' }
                    onChange={ (event) => this._handleExpiryChange(event) }
                    autoComplete="cc-exp"
                    margin="normal"
                    required />

                <TextField
                    label="Name on card"
                    value={ this.state.creditCard.ccName || '' }
                    onChange={ this._handleCreditCardChange('ccName') }
                    autoComplete="cc-name"
                    margin="normal"
                    required />

                <TextField
                    label="CVV"
                    InputProps={ { inputComponent: CvvMask } }
                    value={ this.state.creditCard.ccCvv || '' }
                    onChange={ this._handleCreditCardChange('ccCvv') }
                    autoComplete="cc-cvv"
                    margin="normal"
                    required />
            </div>
        );
    }

    _handleExpiryChange({ target }) {
        const [month, year] = target.value.split('/');

        const creditCard = Object.assign(
            {},
            this.state.creditCard,
            {
                ccExpiry: {
                    month,
                    year,
                },
            },
        );

        this.setState({
            creditCard,
            expiryDate: target.value,
        });

        this.props.onChange(creditCard);
    }

    _handleCreditCardChange(fieldName) {
        return ({ target }) => {
            const creditCard = Object.assign(
                {},
                this.state.creditCard,
                { [fieldName]: target.value },
            );

            this.setState({ creditCard });
            this.props.onChange(creditCard);
        };
    }
}
