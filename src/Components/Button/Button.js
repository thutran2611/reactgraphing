import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    const style = {};

    if (this.props.favoriteColor === 'blue') {
      style.backgroundColor = 'blue';
    }

    return (
      <div style={style} className="Button" onClick={this.props.gotClicked}>
        {this.props.buttonText || 'No button text'}
      </div>
    );
  }
}

export default Button;
