"use strict";
import React from 'react';
import LabelBox from '../components/labelbox.js';
import IOParamEdit from '../components/IOParamEdit.js';
import IntegerParamEdit from '../components/IntegerParamEdit.js';
import EnumParamEdit from '../components/EnumParamEdit.js';


var ParameterDetail = React.createClass({
  getInitialState() {
    return {
    };
  },

  render() {
    var parameter = this.props.selected;
    var header = "";
    var body = "Není vybrán žádný parametr!";
    var GUI_edit = null;
    if(parameter){
      header = parameter.Name;
      body = parameter.Description;
      switch(parameter.Type){
        case 0:
          GUI_edit = <EnumParamEdit
                        parameter={this.props.selected}
                        changedCallback={this.props.changedCallback}
                        readOnly={this.props.readOnly}
                     />
          console.log(this.props.readOnly);
          break;

        case 1:
          GUI_edit = <IntegerParamEdit
                        parameter={this.props.selected}
                        changedCallback={this.props.changedCallback}
                        readOnly={this.props.readOnly}
                     />
          break;

        case 2:
          GUI_edit = <IOParamEdit
                        parameter={this.props.selected}
                        changedCallback={this.props.changedCallback}
                        readOnly={this.props.readOnly}
                     />
          break;
      }
    }

    return(
      <div className="panel panel-primary">
        <div className="panel-heading">{header}</div>
        <div className="panel-body">
          <div><h4>{body}</h4></div>
          <hr />
          <div className="parameter-edit">{GUI_edit}</div>
        </div>
      </div>
    );
  }
});

var ParameterList = React.createClass({
  render() {
    var parameters = [];
    var selected_id = this.props.selected_id;
    var group_id = this.props.group_id;

    /* Create sub_parameters items */
    if(this.props.group && this.props.group.length){
      for(var sub_id = 0; sub_id < this.props.group.length; sub_id++){
        var activated = "list-group-item ";
        if(selected_id && selected_id.id === group_id && selected_id.sub_id === sub_id) activated += "active";

        parameters.push(
          <a href="#" className={activated} onClick={this.props.itemSelected.bind(null, {id: group_id, sub_id: sub_id} )}>
            {this.props.group[sub_id].Name}
          </a>
        );
      }
    }

    return(
      <div className="list-group">
        {parameters}
      </div>
    );
  }
});

var ParameterGroupList = React.createClass({
  getInitialState() {
    return {
      selected_id: null
    };
  },

  itemSelected(selected) {
    var groups = this.props.groups;
    this.setState({selected_id: selected});
    this.props.callback(groups[selected.id].Parameters[selected.sub_id]);
  },

  render() {
    var groups = this.props.groups;
    var group_tags = [];
    var selected_id = this.state.selected_id;

    for(var id = 0; id < groups.length; id++) {
      var collapsed = (id === 0) ? "panel-collapse collapse in" : "panel-collapse collapse";
      var group = groups[id];
      var collapse_id_txt = 'collapse' + id;
      var group_id_txt = 'group' + id;
      /* Create group  */
      group_tags.push(
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id={group_id_txt}>
            <h4 className="panel-title">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href={"#" + collapse_id_txt} aria-expanded="true" aria-controls={collapse_id_txt}>
                {group.GroupName}
              </a>
            </h4>
          </div>
          <div id={collapse_id_txt} className={collapsed} role="tabpanel" aria-labelledby={group_id_txt}>
            <div className="panel-body">
              <ParameterList group_id={id} selected_id={selected_id} group={group.Parameters} itemSelected={this.itemSelected}/>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        {group_tags}
      </div>
    );
  }
});

var ParameterContainer = React.createClass({
  getInitialState() {
    return {
      group: Board.Parameters,
      selected: null,
      readOnly: Board.ReadOnly
    };
  },

  selectedParameter(param){
    console.log(param);
    this.setState({selected: param});
  },

  changedParameter(value){
    var param = this.state.selected;
    param.Value = value;
    this.setState({selected: param});
  },

  render() {
    return (
      <div id="Parameters" className="container">
        <h2><LabelBox label={this.props.Name} type="primary"/></h2>
        <hr />
        <div className="row">
          <div className="col-sm-4" id="parameter-list">
            <ParameterGroupList
               groups={this.state.group}
               callback={this.selectedParameter}
               groupCallback={this.selectedGroup}
               group={this.state.group}
            />
          </div>
          <div className="col-sm-8" id="parameter-detail">
            <ParameterDetail
               selected={this.state.selected}
               changedCallback={this.changedParameter}
               readOnly={this.state.readOnly}
            />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ParameterContainer;

// var render = ReactDOM.render(
//   <ParameterContainer Name="Parametry" />,
//   document.getElementById('container')
// );
