import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.css';
import Box from './Components/Dropdown/Dropdown.js';
import Button from './Components/Button/Button.js';
import Currency from './Components/Currency/Currency.js';

let ALL_CURRENCIES = ["CAD","HKD","ISK","PHP","DKK","HUF","CZK","AUD","RON","SEK","IDR","INR","BRL","RUB","HRK","JPY","THB","CHF","SGD","PLN","BGN","TRY","CNY","NOK","NZD","ZAR","USD","MXN","ILS","GBP","KRW","MYR","EUR"];

class App extends Component {
  state ={
    rates: [
       {"label":"USD", "percentage":44.5},
       {"label":"EUR", "percentage":50},
       {"label":"USD", "percentage":44.5},
       {"label":"EUR", "percentage":50},
    ],
    base: 100,
    basename: "EUR",
    selectedCurrencies: [],
  }

  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest")
       .then(response => response.json())
       .then( data => {
           let label = Object.keys(data.rates);
           let newData = [];
            for (let [item, number] of Object.entries(data.rates)) {
                 newData.push({
                   label: item,
                   percentage: (100/number)/2,
                 })
            }
           this.setState({
               rates: newData,
            });
        });
  }

  onSubmit = () => {
    fetch (`https://api.exchangeratesapi.io/latest?base=${this.state.basename}&symbols=${this.state.selectedCurrencies.join(',')}`)
      .then(response => response.json())
      .then(data => {
           let label = Object.keys(data.rates);
           let newData = [];
            for (let [item, number] of Object.entries(data.rates)) {
                 newData.push({
                   label: item,
                   percentage: (100/number)/100,
                 })
              }
           this.setState({
               rates: newData,
            });
        })
  }



  _onSelect = (data) => {
    let value = data.value;
    this.setState({
       basename: value,
     }, () => {
       this.onSubmit();
     });
  }

  onChange = (index) => {
    const availableCurrencies = ALL_CURRENCIES.slice();
    const chosenCurrencies = this.state.selectedCurrencies.slice();
    const currency = availableCurrencies[index];
    chosenCurrencies.push(currency);
    availableCurrencies.splice(index,1);
    
    this.setState({
        selectedCurrencies: chosenCurrencies,
     }, () => {
       this.onSubmit();
    });
    }

  render() {
    const options = this.state.rates.map(rate => rate.label);
  
  
    return (
      <div className="App">
          <div className="TopPart">
              <h1> Currency </h1>
              <div className="CurrencyChooser">
                 <Dropdown 
                    options={options}
                     onChange={this._onSelect}
                     value={this.state.basename}
                     placeholder="Select a base currency"/>

                  <Box>
                    {
                        ALL_CURRENCIES.map((currency,index) => (
                            <Currency onButtonClick={() => this.onChange(index)}
                                      currencies={currency}/>
                         ))
                     }

                   </Box>
              </div>
          </div>

      <div className="MainContent">
         {
             this.state.rates.map(rate => (
                 <div className="BarChart-bar" style={{"height":rate.percentage+"%"}} >
                 {rate.label} </div>
              ))
          }
      </div>
    </div>
    );
  }
}

export default App;



