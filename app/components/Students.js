import React from 'react';
import {connect} from 'react-redux'
import ReactTable from 'react-table'

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
        }
    }

    componentDidMount(){
        // get all students and add to state
        const route = "/api/students";
        fetch(route).then((Response) => Response.json()).
        then((response) =>
        {
            console.log(response);
            this.setState({
                data: response
            })
        })
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
            <div className="container-fluid">
                <ReactTable
                    data={this.state.data}
                    columns={columns}
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

export default connect(mapStateToProps)(Home);
