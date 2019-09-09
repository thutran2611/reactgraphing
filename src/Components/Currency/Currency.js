import React, { Component } from 'react';
import './Currency.css';

class Currency extends Component {
 render() {
    return (
      <div className="Character">
        <h4>{this.props.currencies}</h4>
        {
          this.props.onButtonClick ? (
            <button onClick={this.props.onButtonClick}>
              {this.props.buttonText || 'Choose'}
            </button>
          ) : (
            null
          )
        }
      </div>
    );
  }
}
export default Currency;

