import React, { Component } from 'react';
import './Dropdown.css';

import Button from '../Button/Button.js';

class Box extends Component {

//  getUnicodeArrow = () => {
//    if (this.props.show) {
//      return " ↑";
//    } else {
//      return " ↓";
//    }
//  }

//  onButtonClick = () => {
//    if (this.props.show) {
//      this.props.onHide();
//    } else {
//      this.props.onShow();
//    }
//  }

  render() {


    return (
      <div className="Dropdown">
        <div className="Dropdown-box">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Box;
