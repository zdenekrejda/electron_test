import React from 'react';
import LabelBox from './labelbox.js';

var EnumParamEdit = React.createClass({
    valueChanged(e){
        if(this.props.readOnly) return;

        var newValue = e.target.value;
        this.props.changedCallback(newValue);
        console.log(newValue);
    },

    render() {
        var parameter = this.props.parameter,
            readOnly = "",
            _enum = parameter.Enum,
            enum_items = [];

        for(var index = 0; index < _enum.length; index++) {
          enum_items.push(
            <option value={index}>{_enum[index]}</option>
          );
        }

        if(this.props.readOnly) {
            readOnly = <div><h4><LabelBox label="Pouze pro čtení!" type="danger"/></h4></div>;
        }

        return(
          <div className="panel panel-default">
            <div className="panel-body">
              <select className="form-control" value={parameter.Value} onChange={this.valueChanged}>
                {enum_items}
              </select>
              <hr />
              <h2>{_enum[parameter.Value]}</h2>
              <hr />
              <h4>Typ ENUM</h4>
              {readOnly}
            </div>
          </div>
        );
    }
});

module.exports = EnumParamEdit;
