import * as ActionTypes from '../actions/ActionTypes'

const initialState = {
    students: []
};

export default function students(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCHED_ALL_STUDENTS:
            return action.payload;
        case ActionTypes.ERROR_FETCHING_STUDENTS:
            return initialState;
        case ActionTypes.DELETE_STUDENT_SUCCESS:
            return state.filter((obj) => action.deleted_ids.indexOf(obj._id) < 0);
        case ActionTypes.DELETE_STUDENT_ERROR:
        default:
            return state;
    }
}
