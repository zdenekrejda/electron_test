'use strict';
/*
GenericForm Properties

formId: unique form ID
formTitle:
userForm:
submitBtnName: user can change submit button title
submitCallback:
*/
var GenericForm = React.createClass({
    submitForm() {
        this.props.submitCallback();
    },

    render() {
        return (
            <div className="modal fade" id={this.props.formId} tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header modal-header-blue">
                            <button type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">{this.props.formTitle}</h4>
                        </div>

                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="center-block">
                                        {this.props.userForm}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-red red-border" data-dismiss="modal">Zrušit</button>
                            <button type="submit" className="btn btn-default btn-green yellow-border" onClick={this.submitForm}>{this.props.submitBtnName}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = GenericForm;
