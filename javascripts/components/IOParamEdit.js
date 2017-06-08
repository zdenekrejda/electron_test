import React from 'react';
import LabelBox from './labelbox.js';

var IOParamEdit = React.createClass({
  valueChanged(e){
      if(this.props.readOnly) return;

      var newValue = this.props.parameter.Value;
      newValue.Function = e.target.value;
      this.props.changedCallback(newValue);
      console.log(newValue);
  },

  invertChanged(invert){
      if(this.props.readOnly) return;

      var newValue = this.props.parameter.Value;
      newValue.Invert = invert;
      this.props.changedCallback(newValue);
      console.log(invert);
  },

  render() {
    var parameter = this.props.parameter;
    var _enum = parameter.Enum;
    var enum_items = [];

    for(var index = 0; index < _enum.length; index++) {
      enum_items.push(
        <option value={index}>{_enum[index]}</option>
      );
    }

    /* Check if there IO has some function */
    //if(parameter.Value.Function === 0) parameter.Value.Invert = false;

    var checkBox,
        readOnly = "",
        inverted = "";
    if(parameter.Value.Invert) {
      checkBox = <input type="checkbox" value="true" aria-label="Negace" checked  onClick={this.invertChanged.bind(null, !parameter.Value.Invert)}/>;
      inverted = <span className="label label-danger">Invertováno</span>;
    }
    else {
      checkBox = <input type="checkbox" value="true" aria-label="Negace"  onClick={this.invertChanged.bind(null, !parameter.Value.Invert)}/>;
    }

    if(this.props.readOnly) {
        readOnly = <div><h4><LabelBox label="Pouze pro čtení!" type="danger"/></h4></div>;
    }

    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="input-group">
            <span className="input-group-addon beautiful">
              {checkBox}
            </span>
            <select className="form-control" value={parameter.Value.Function} onChange={this.valueChanged}>
              {enum_items}
            </select>
          </div>
          <hr />
          <div>
            <h5>Funkce:</h5>
            <h3>
              {_enum[parameter.Value.Function]} {inverted}
            </h3>
          </div>
          <hr />
          <h4>Typ IO</h4>
          {readOnly}
        </div>
      </div>
    );
  }
});

module.exports = IOParamEdit;
