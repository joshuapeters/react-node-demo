import * as ActionTypes from './ActionTypes'

export function fetchAllStudents(){
    return dispatch => {
        fetch('/api/students/').then((Response) => Response.json()).
        then((response) =>
        {
            dispatch({type: ActionTypes.FETCHED_ALL_STUDENTS, payload: response});
        })
        .catch((ex)=>{
            dispatch({type: ActionTypes.ERROR_FETCHING_STUDENTS, students: [], messages: [{msg: ex.message}]});
        })
    }
}

export function deleteStudents(ids){
    return dispatch => {
        fetch ('/api/students/', {
            method: 'DELETE',
            body: JSON.stringify(ids),
            headers: {
                'content-type': 'application/json'
            }
        }).then(() => {
            dispatch ({
                type: ActionTypes.DELETE_STUDENT_SUCCESS,
                messages: [{ msg : "Successfully deleted selected students!" }],
                deleted_ids: ids
            })
        }).catch((ex)=>{
            dispatch ({
                type: ActionTypes.DELETE_STUDENT_ERROR,
                messages: [{msg: ex.message}]
            })
        })
    }
}