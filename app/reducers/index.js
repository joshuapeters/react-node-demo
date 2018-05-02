import {combineReducers} from 'redux';
import messages from './messages';
import auth from './auth';
import create from './create'
import students from './students'



export default combineReducers({
    auth,
    messages,
    students,
    create
});
