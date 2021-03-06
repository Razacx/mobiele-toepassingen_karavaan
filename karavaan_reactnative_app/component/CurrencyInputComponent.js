import {Content, Input} from "native-base";
import React from "react";

export default class CurrencyInputComponent extends React.Component {

    //Handles its own values, but the onChangeText event is forwarded
    //TODO: Add a way to choose the currency

    // Properties:
    // - onValueChange : function(value) : returns the new value as a float
    // - startValue (optional) : starting value as a number

    constructor(props) {
        super(props);
        let startValue = this.props.startValue !== undefined ? (parseFloat(this.props.startValue) * 100).toString() : "";
        this.state = {
            currencyRaw: startValue
        };
    }

    onCurrencyRawChange(value) {
        value = this.sanitizeString("0123456789", value);
        this.setState({currencyRaw: value});

        //Forward event
        if (this.props.onValueChange !== undefined) {
            this.props.onValueChange(this.stringToFloat(value));
        }

    }

    sanitizeString(validChars, inputString) {
        let regex = new RegExp('[^' + validChars + ']', 'g');
        return inputString.replace(regex, '');
    }

    stringToFloatFormatted(value) {
        if (value === "") value = "0";
        value = (parseFloat(value) / 100).toFixed(2).toString();
        return value;
    }

    stringToFloat(value) {
        if (value === "") value = 0;
        value = (parseFloat(value) / 100);
        return value;
    }

    render() {

        return (
            <Content>
                <Input placeholder='Expense cost'
                       value={this.stringToFloatFormatted(this.state.currencyRaw)}
                       onFocus={() => {
                           this.refs.rawInput._root.focus();
                       }}/>

                <Input value={this.state.currencyRaw}
                       ref='rawInput'
                       style={{height: 0, margin: 0, padding: 0}}
                       onChangeText={this.onCurrencyRawChange.bind(this)}
                       keyboardType='numeric'
                       maxLength={9}/>
            </Content>
        );

    }

}