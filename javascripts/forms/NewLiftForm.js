'use strict';

import GenericForm from './GenericForm.jsx';

var NewLiftForm = React.createClass({
    submitForm() {
        var Update = this.props.Update;

        sendRequest("POST", "/lifts", $('#liftdata').serialize(),
                       function (data) {
                           console.log('ok');
                           $("#myModal").modal('hide');
                           //$('#liftsCount').text(data.liftsCount);
                           console.log('ok2');
                           Update();
                       },
                       function () {
                           $("#myModal").modal('hide');
                       });
    },

    createMainForm() {
        return (
            <form id="liftdata" className="form-register">
                <div className="form-group">
                    <label>Adresa</label>
                    <input className="form-control input-sm" type="text" placeholder="Adresa" name="address"/>
                </div>
                <div className="form-group">
                    <label>Uživatelský popis</label>
                    <input className="form-control input-sm" type="text" placeholder="Popis" name="description"/>
                </div>
                <div className="form-group" id="floors">
                    <label>Počet stanic</label>
                    <input className="form-control input-sm" type="number" min="2" max="32" placeholder="Počet stanic" name="floors"/>
                </div>
                <label>Řídící systém</label>
                <div className="form-group">
                    <select name="board_type">
                        <option value="0">E348/RV-C01</option>
                        <option value="1">E248/E148</option>
                    </select>
                </div>
                <label>Typ pohonu</label>
                <div className="form-group">
                    <select name="engine">
                        <option value="0">Frekvenční měnič</option>
                        <option value="1">Hydraulický</option>
                        <option value="2">2-rychlostní</option>
                    </select>
                </div>
                <input type="hidden" name="_csrf" value={this.props.csrf_token}/>
            </form>
        );
    },

    render() {
        return (
            <GenericForm
                formId="myModal"
                formTitle="Registrace výtahu"
                userForm = {this.createMainForm()}
                submitBtnName = "Registrovat"
                submitCallback = {this.submitForm} />
        );
    }
});

module.exports = NewLiftForm;
