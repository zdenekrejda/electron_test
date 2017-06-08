import React from 'react';
import LabelBox from './labelbox.js';

var IntegerParamEdit = React.createClass({
  valueChanged(e){
      if(this.props.readOnly) return;

      var parameter = this.props.parameter;
      var newValue = parseInt(e.target.value);

      if(newValue >= parameter.Min && newValue <= parameter.Max) this.props.changedCallback(newValue);
  },

  valueIncrement(){
      if(this.props.readOnly) return;

      var parameter = this.props.parameter;
      var newValue = parameter.Value;
      newValue++;

      if(newValue >= parameter.Min && newValue <= parameter.Max) this.props.changedCallback(newValue);
  },

  valueDecrement(){
      if(this.props.readOnly) return;
      var parameter = this.props.parameter;
      var newValue = parameter.Value;
      newValue--;

      if(newValue >= parameter.Min && newValue <= parameter.Max) this.props.changedCallback(newValue);
  },

  valueClear(){
      if(this.props.readOnly) return;
      this.props.changedCallback(this.props.parameter.Min);
  },

  render() {
    var parameter = this.props.parameter,
        readOnly = "";

    if(this.props.readOnly) {
        readOnly = <div><h4><LabelBox label="Pouze pro čtení!" type="danger"/></h4></div>;
    }

    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="input-group">
            <input type="text" className="form-control" onChange={this.valueChanged} value={parameter.Value}/>
            <div className="input-group-btn">
              <button className="btn btn-success" type="button" onClick={this.valueDecrement}>
                <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
              </button>

              <button className="btn btn-success" type="button" onClick={this.valueIncrement}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              </button>

              <button className="btn btn-danger" type="button" onClick={this.valueClear}>
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
            </div>
          </div>
          <h4>Rozsah {parameter.Min} - {parameter.Max}</h4>
          <hr />
          <h4>Typ INTEGER</h4>
          {readOnly}
        </div>
      </div>
    );
  }
});

module.exports = IntegerParamEdit;
