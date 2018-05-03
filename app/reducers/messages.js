import * as ActionTypes from '../actions/ActionTypes'

export default function messages(state = {}, action) {
    switch (action.type) {
        case 'LOGIN_FAILURE':
        case 'SIGNUP_FAILURE':
        case 'UPDATE_PROFILE_FAILURE':
        case 'CHANGE_PASSWORD_FAILURE':
        case 'FORGOT_PASSWORD_FAILURE':
        case 'RESET_PASSWORD_FAILURE':
        case 'CONTACT_FORM_FAILURE':
        case 'OAUTH_FAILURE':
        case 'UNLINK_FAILURE':
        case 'LINK_FAILURE':
        case ActionTypes.ERROR_FETCHING_STUDENTS:
        case ActionTypes.CREATE_STUDENT_ERROR:
        case ActionTypes.UPDATE_STUDENT_ERROR:
        case ActionTypes.DELETE_STUDENT_ERROR:
            return {
                error: action.messages
            };
        case 'UPDATE_PROFILE_SUCCESS':
        case 'CHANGE_PASSWORD_SUCCESS':
        case 'RESET_PASSWORD_SUCCESS':
        case 'CONTACT_FORM_SUCCESS':
        case ActionTypes.CREATE_STUDENT_SUCCESS:
        case ActionTypes.UPDATE_STUDENT_SUCCESS:
        case ActionTypes.DELETE_STUDENT_SUCCESS:
            return {
                success: action.messages
            };
        case 'FORGOT_PASSWORD_SUCCESS':
        case 'DELETE_ACCOUNT_SUCCESS':
        case 'UNLINK_SUCCESS':
            return {
                info: action.messages
            };
        case 'CLEAR_MESSAGES':
            return {};
        default:
            return state;
    }
}
