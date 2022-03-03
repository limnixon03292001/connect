import {combineReducers} from 'redux';
import  authReducer  from './reducers/auth';
import  usersReducer  from './reducers/users';
import postReducer from './reducers/post';

const rootReducer = combineReducers({ 
    auth: authReducer, 
    users: usersReducer, 
    posts: postReducer 
});

export default rootReducer;  