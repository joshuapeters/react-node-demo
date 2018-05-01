import React from 'react';
import autoBind from 'react-autobind'
import {fetchStudent, createStudent, updateStudent, updateGlobalStudentState} from "../actions/create";
import {connect} from "react-redux";

class Create extends React.Component {

    constructor(p){
        super(p);
        this.isNew = !!this.p.params.id;
        this.state = {
            id: isNew ? '' : this.p.params.id,
        };
        autoBind(this);
        this.handleChange.bind(this);
        this.handleSave.bind(this);
    }

    componentDidMount(){
        this.handleInit();
    }

    handleInit(){
        if (this.isNew)
            return;
        this.props.fetchStudent(this.state.id)
    }

    handleChange(event) {
        this.props.updateGlobalStudentState(event.target.name, event.target.value)
    }

    handleSave() {
        if (this.isNew)
            this.props.createStudent(this.props.student);
        else
            this.props.updateStudent(this.state.id, this.props.student);
    }

    handleExit(){
        if (!this.props.dirty)
            return;

        //todo: build popup to discard changes
    }


    render(){

        return(
            <div className="container">
                <form onSubmit={this.handleSave}>
                    <legend>{this.loading ? "Loading..." : this.props.header}</legend>
                    <div className="form-group">
                        <label htmlFor="txtFirstName">First Name</label>
                        <input type="text" name="firstName" id="txtFirstName" placeholder="First Name" autoFocus className="form-control" value={this.props.student.first_name} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtLastName">Last Name</label>
                        <input type="text" name="lastName" id="txtLastName" placeholder="Last Name" autoFocus className="form-control" value={this.props.student.last_name} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtEmail">First Name</label>
                        <input type="email" name="email" id="txtEmail" placeholder="Email" autoFocus className="form-control" value={this.props.student.email} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="numAge">Age</label>
                        <input type="number" name="age" id="numAge" placeholder="Age" className="form-control" value={this.props.student.age} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ddlGrade">Grade</label>
                        <select className="form-control" id="ddlGrade" value={this.props.student.grade} onChange={this.handleChange}>
                            <option value="Pre-K">Pre-K</option>
                            <option value="K">Kindergarten</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
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
        messages: state.messages
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //todo: map dispatch functions to properties
        fetchStudent : (id) => dispatch(fetchStudent(id)),
        updateStudent : (id, student) => dispatch(updateStudent(id, student)),
        createStudent: (student) => dispatch(createStudent(student)),
        updateGlobalStudentState: (propName, propVal) => dispatch(updateGlobalStudentState(propName, propVal))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);