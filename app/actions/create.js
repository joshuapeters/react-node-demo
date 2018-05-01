import * as ActionTypes from './ActionTypes'

export function fetchStudent(id){
    return dispatch => {
        fetch('/api/students/' + id).then((Response) => Response.json()).
        then((response) =>
        {
            dispatch({type: ActionTypes.CREATE_OR_EDIT_LOAD_EXISTING, student: response});
        })
        .catch((ex)=>{
            dispatch({type: ActionTypes.ERROR_FETCHING_STUDENT, messages: [{msg: ex.message}]});
        })
    }
}

export function updateGlobalStudentState(propName, propValue){
    return dispatch =>{
        dispatch({
            type: ActionTypes.UPDATE_LOCAL_STUDENT_STATE,
            propName,
            propValue,
            dirty: true
        })
    }
}

export function createStudent(student){
    return dispatch => {
        fetch ('/api/students/', {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'content-type': 'application/json'
            }
        }).then(() => {
            dispatch ({
                type: ActionTypes.CREATE_STUDENT_SUCCESS,
                messages: [{ msg : "Student successfully created!" }],
                student,
                dirty: false
            })
        }).catch((ex)=>{
            dispatch ({
                type: ActionTypes.DELETE_STUDENT_ERROR,
                messages: [{msg: ex.message}]
            })
        })
    }
}

export function updateStudent(id, student){

    return dispatch => {
        fetch ('/api/students/' + id, {
            method: 'PUT',
            body: JSON.stringify(student),
            headers: {
                'content-type': 'application/json'
            }
        }).then(() => {
            dispatch ({
                type: ActionTypes.UPDATE_STUDENT_SUCCESS,
                messages: [{ msg : "Successfully deleted selected students!" }],
                student,
                dirty: false
            })
        }).catch((ex)=>{
            dispatch ({
                type: ActionTypes.DELETE_STUDENT_ERROR,
                messages: [{msg: ex.message}]
            })
        })
    }
}