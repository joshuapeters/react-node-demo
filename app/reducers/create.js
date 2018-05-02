import * as ActionTypes from '../actions/ActionTypes'

const initialState = {
    student: {
        _id: "",
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        grade: ""
    },
    dirty: false
};

export default function create(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CREATE_OR_EDIT_LOAD_NEW:
            return initialState;
        case ActionTypes.UPDATE_LOCAL_STUDENT_STATE:
            return getUpdatedState(state, action);
        case ActionTypes.CREATE_OR_EDIT_LOAD_EXISTING:
        case ActionTypes.CREATE_STUDENT_SUCCESS:
        case ActionTypes.UPDATE_STUDENT_SUCCESS:
            return Object.assign({}, state, {
                student: action.student,
                dirty: action.dirty
            });
        case ActionTypes.CREATE_STUDENT_ERROR:
        case ActionTypes.UPDATE_STUDENT_ERROR:
        case ActionTypes.ERROR_FETCHING_STUDENT:
        default:
            return state;
    }
}

function getUpdatedState(state, action){
    state[action.propName] = action.propValue;
    state.dirty = action.dirty;
    return state;
}
