import React from 'react';
import {connect} from 'react-redux'
import ReactTable from 'react-table'
import {Button, ButtonToolbar} from 'react-bootstrap'
import {StudentProvider} from "../../api/providers/StudentProvider"

class Students extends React.Component {
    studentProvider;

    constructor() {
        super();
        this.state = {
            data: [],
            selected: [],
            canEdit: false,
            canDelete: false
        };
        this.studentProvider = new StudentProvider();
    }

    componentDidMount(){
        // get all students and add to state
        this.studentProvider.getAllStudents().then((Response) => Response.json()).
        then((response) =>
        {
            console.log(response);
            this.setState({
                data: response
            })
        })
    }

    deleteSelected(){
        // todo: pop modal and on accept delete student
    }

    render() {
        const columns = [{
            Header: 'First Name',
            accessor: 'first_name' // String-based value accessors!
        }, {
            Header: 'Last Name',
            accessor: 'last_name'
        }, {
            Header: 'Email',
            accessor: 'email'
        }, {
            Header: 'Grade',
            accessor: 'grade'
        }];

        return (
            <div className="container">
                <ButtonToolbar>
                    <Button bsStyle="danger" disabled={!this.state.canDelete} onClick={this.deleteSelected}>Delete</Button>
                    <Button bsStyle="primary" disabled={!this.state.canEdit} href={"/create/" + this.state.selected[0]}>Edit</Button>
                </ButtonToolbar>
                <ReactTable className="-highlight"
                            data = {this.state.data}
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    };
};

export default connect(mapStateToProps)(Students);
