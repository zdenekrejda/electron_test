'use strict';
import React from "react";

var LabelBox = React.createClass({
  render(){
    var type = "label label-" + this.props.type;

    return(
      <span className={type}>{this.props.label}</span>
    );
  }
});

module.exports = LabelBox;
