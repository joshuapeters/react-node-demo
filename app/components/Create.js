import React from 'react';
import autoBind from 'react-autobind'
import {fetchStudent, createStudent, updateStudent} from "../actions/create";
import {connect} from "react-redux";
import Messages from "./Messages";

class Create extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.id = props.params.id;
        this.isNew = (typeof this.id === 'undefined');
        this.state = {
            first_name_static: '',
            last_name_static: '',
            first_name: '',
            last_name: '',
            email: '',
            age: '',
            grade: '',
            show: false
        };
        autoBind(this);
        this.handleChange.bind(this);
        this.handleSave.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (Object.keys(nextProps.params).length > 0)
            return;
        this.isNew = true;
        this.resetState();
        this.forceUpdate();
    }

    componentDidMount() {
        if (this.isNew) {
            this.setState({
                show: true
            });
            return;
        }
        this.props.fetchStudent(this.props.params.id).then(() => {
            this.setState({
                first_name_static: this.props.student.first_name,
                last_name_static: this.props.student.last_name,
                first_name: this.props.student.first_name,
                last_name: this.props.student.last_name,
                email: this.props.student.email,
                age: this.props.student.age,
                grade: this.props.student.grade,
                show: true
            })
        });
        this.forceUpdate();
    }

    resetState() {
        this.setState({
            first_name_static: '',
            last_name_static: '',
            first_name: '',
            last_name: '',
            email: '',
            age: '',
            grade: '',
            show: true
        })
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSave() {
        let student = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            age: this.state.age,
            grade: this.state.grade
        };

        this.createOrUpdate(this.id, student, this.isNew);
    }

    createOrUpdate(id, student, isNew){
        return isNew ? this.props.createStudent(student) : this.props.updateStudent(id, student);
    }


    render() {
        return (

            <div className="container">
                <Messages messages={this.props.messages}/>
                <h1 className={this.state.show ? "hidden" : "header"}>Loading...</h1>
                <form className={this.state.show ? "form-control-static" : "hidden"}>
                    <legend>{this.isNew ? "Create Student" : "Updating " + this.state.first_name_static + " " + this.state.last_name_static}</legend>
                    <div className="form-group">
                        <label htmlFor="txtFirstName">First Name</label>
                        <input type="text" name="first_name" id="txtFirstName" placeholder="First Name" autoFocus
                               className="form-control" value={this.state.first_name} onChange={this.handleChange}
                               required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtLastName">Last Name</label>
                        <input type="text" name="last_name" id="txtLastName" placeholder="Last Name"
                               className="form-control" value={this.state.last_name} onChange={this.handleChange}
                               required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtEmail">First Name</label>
                        <input type="email" name="email" id="txtEmail" placeholder="Email" className="form-control"
                               value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="numAge">Age</label>
                        <input type="number" name="age" id="numAge" placeholder="Age" className="form-control"
                               value={this.state.age} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ddlGrade">Grade</label>
                        <select className="form-control" name="grade" id="ddlGrade" value={this.state.grade}
                                onChange={this.handleChange}>
                            <option>Select...</option>
                            <option value="0">Pre-K</option>
                            <option value="1">Kindergarten</option>
                            <option value="2">1</option>
                            <option value="3">2</option>
                            <option value="4">3</option>
                            <option value="5">4</option>
                            <option value="6">5</option>
                            <option value="7">6</option>
                            <option value="8">7</option>
                            <option value="9">8</option>
                            <option value="10">9</option>
                            <option value="11">10</option>
                            <option value="12">11</option>
                            <option value="13">12</option>
                        </select>
                    </div>
                    <button onClick={this.handleSave} className="btn btn-success right">Save</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        student: state.create.student,
        dirty: state.create.dirty,
        messages: state.messages
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudent: (id) => dispatch(fetchStudent(id)),
        updateStudent: (id, student) => dispatch(updateStudent(id, student)),
        createStudent: (student) => dispatch(createStudent(student))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);