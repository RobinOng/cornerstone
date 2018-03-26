import React from 'react';
import MaskedInput from 'react-text-mask';

export default class MonthYearMaskComponent extends React.Component {
    render() {
        return (
            <MaskedInput
                mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                placeholderChar={'\u2000'} />
        );
    }
}
