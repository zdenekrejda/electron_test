'use strict';
import React from 'react';

var AlertWindow = React.createClass({
    close() {
        this.props.close(this.props.index);
    },

    render() {
        var lift = this.props.lift;
        return (
            <div className="alert fade in col-md-3 col-sm-12 col-xs-12" id={lift._id}>
                <a href="#" className="close" data-dismiss="alert" aria-label="close" onClick={this.close}>
                    <h3>&times;</h3>
                </a>
                <div className="panel panel-danger bg-color-gray">
                    <div className="panel-heading back-header-success">
                        <a href={`/lifts/${lift._id}`}>
                            <h4>{lift.address}</h4>
                        </a>
                    </div>
                    <div className="panel-body text-center">
                        <i className="fa fa-exclamation-triangle fa-5x"></i>
                        <div className="content big-text text-content-success">{lift.events_count}</div>
                    </div>
                    <div className="panel-footer text-center text-content-success">
                        <p>{lift.lift_description}</p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = AlertWindow;
