import React from 'react';
import {connect} from 'react-redux'
import ReactTable from 'react-table'
import {Button, ButtonToolbar, Modal} from 'react-bootstrap'
import {fetchAllStudents, deleteStudents} from "../actions/students";
import {getStudents} from "../selectors/students";
import autoBind from 'react-autobind'
import Messages from './Messages';

class Students extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: [],
            canEdit: false,
            canDelete: false,
            show: false
        };
        autoBind(this);
        this.handleHide.bind(this);
        this.handleDelete.bind(this);
    }

    componentDidMount(){
        this.props.fetchAllStudents();
    }

    popDeleteConfirmation(){
        this.setState({
            show: true
        });
    }

    deleteSelected(ids){
        this.props.deleteStudents(ids);

    }

    handleHide(){
        this.setState({
            show: false
        });
    }

    handleDelete(){
        this.deleteSelected(this.state.selected);
        this.setState({
            selected: [],
            canEdit: false,
            canDelete: false,
            show: false
        });
    }

    render() {
        const columns = [{
            Header: 'First Name',
            accessor: 'first_name'
        }, {
            Header: 'Last Name',
            accessor: 'last_name'
        }, {
            Header: 'Email',
            accessor: 'email'
        }, {
            Header: 'Grade',
            accessor: 'grade'
        }, {
            Header: 'Age',
            accessor: 'age'
        }];

        return (
            <div className="container-fluid">
                <Messages messages={this.props.messages}/>
                <ButtonToolbar>
                    <Button bsStyle="danger" disabled={!this.state.canDelete} onClick={this.popDeleteConfirmation}>Delete</Button>
                    <Button bsStyle="primary" disabled={!this.state.canEdit} href={"/edit/" + this.state.selected[0]}>Edit</Button>
                </ButtonToolbar>
                <ReactTable className="-highlight"
                            data = {this.props.students}
                            columns = {columns}
                            sortable = "true"
                            multiSort = "true"
                            filterable = "true"
                            // enable selected row highlighting
                            getTrProps={(state, rowInfo) => {

                                if (!rowInfo)
                                    return {};

                                let rowObjId = rowInfo.original._id,
                                    selected = this.state.selected,
                                    selectedIndex = selected.indexOf(rowObjId);

                                return {
                                    onClick: () => {

                                        if (selectedIndex >= 0)
                                            selected.splice(selectedIndex, 1);
                                        else
                                            selected.push(rowObjId);

                                        this.setState({
                                            selected: selected,
                                            canEdit: selected.length === 1,
                                            canDelete: selected.length > 0
                                        });
                                    },
                                    style: (selectedIndex < 0) ? {} : { background: "#beffec" }
                                }
                            }}
                />

                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Deleting Students!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Warning!</p>
                        <p>You are about to delete any students you have selected. Are you sure you want to continue?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
                        <Button onClick={this.handleHide}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const students = getStudents(state);
    return {
        messages: state.messages,
        students
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchAllStudents: () => {dispatch(fetchAllStudents())},
      deleteStudents: (ids) => {dispatch(deleteStudents(ids))}
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(Students);
