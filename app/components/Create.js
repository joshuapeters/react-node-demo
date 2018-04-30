import React from 'react';
import {InputGroup, Dropdown, Button, ButtonToolbar, FormGroup, FormControl, HelpBlock, ControlLabel} from 'react-bootstrap'
import {StudentAPIWrapper} from "../var/apiWrapper";
import {connect} from "react-redux";
import {getStudent} from "../actions/edit";

class Create extends React.Component {

    constructor(props){
        super(props);
        this.isNew = !!this.props.params.id;
        this.loading = !this.isNew;
        this.state = {
            student: {
                id: "",
                first_name: "",
                last_name: "",
                email: "",
                age: "",
                grade: ""
            },
            header: ""
        };
        this.studentAPI = new StudentAPIWrapper();
    }

    handleInit(){
        if (this.isNew)
            return;

        this.props.dispatch(getStudent(this.props.params.id));
    }

    componentDidMount(){
        this.handleInit();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSave(event) {
        //todo: handle save
    }


    render(){

        return(
            <div className="container">
                <form onSubmit={this.handleSave.bind(this)}>
                    <legend>{this.loading ? "Loading..." : this.props.header}</legend>
                    <div className="form-group">
                        <label htmlFor="txtFirstName">First Name</label>
                        <input type="text" name="firstName" id="txtFirstName" placeholder="First Name" autoFocus className="form-control" value={this.props.student.first_name} onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtLastName">Last Name</label>
                        <input type="text" name="lastName" id="txtLastName" placeholder="Last Name" autoFocus className="form-control" value={this.props.student.last_name} onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtEmail">First Name</label>
                        <input type="email" name="email" id="txtEmail" placeholder="Email" autoFocus className="form-control" value={this.props.student.email} onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="numAge">Age</label>
                        <input type="number" name="age" id="numAge" placeholder="Age" className="form-control" value={this.props.student.age} onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ddlGrade">Grade</label>
                        <select className="form-control" id="ddlGrade" value={this.props.student.grade} onChange={this.handleChange.bind(this)}>
                            <option value="Pre-K">Pre-K</option>
                            <option value="K">Kindergarten</option>
                            <option value="1">First</option>
                            <option value="2">Second</option>
                            <option value="3">Third</option>
                            <option value="4">Fourth</option>
                            <option value="5">Fifth</option>
                            <option value="6">Sixth</option>
                            <option value="7">Seventh</option>
                            <option value="8">Eighth</option>
                            <option value="9">Ninth</option>
                            <option value="10">Tenth</option>
                            <option value="11">Eleventh</option>
                            <option value="12">Twelfth</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Save</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        student: state.student,
        header: state.header
    };
};

const mapDispatchToProps = (state) => {
    return {
        //todo: map dispatch functions to properties
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);