import React, {useEffect, useRef, useState} from 'react';
import {Block} from './Block';
import './index.scss';

function App() {

    const ratesRef = useRef({});

    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('BYN');

    const [fromPrise, setFromPrise] = useState(0);
    const [toPrise, setToPrise] = useState(1);


    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/latest.js')
            .then((res) => res.json())
            .then((json) => {
                ratesRef.current = json.rates;
                onChangeToPrise(1);
            }).catch((err) => {
            console.log(err);
            alert('Failed to get information');
        })
    }, []);

    const onChangeFromPrise = (value) => {
        const prise = value / ratesRef.current[fromCurrency];
        const result = prise * ratesRef.current[toCurrency];
        setToPrise(result.toFixed(3));
        setFromPrise(value);
    }

    const onChangeToPrise = (value) => {
        const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
        setFromPrise(result.toFixed(3));
        setToPrise(value);
    }

    useEffect(() => {
        onChangeFromPrise(fromPrise);
    }, [fromCurrency]);

    useEffect(() => {
        onChangeToPrise(toPrise);
    }, [toCurrency]);

    return (
        <div className="App">
            <Block value={fromPrise}
                   currency={fromCurrency}
                   onChangeCurrency={setFromCurrency}
                   onChangeValue={onChangeFromPrise}
            />
            <Block value={toPrise}
                   currency={toCurrency}
                   onChangeCurrency={setToCurrency}
                   onChangeValue={onChangeToPrise}
            />
        </div>
    );
}

export default App;
