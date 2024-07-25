import { combineReducers } from "redux";

import {
    usersReducer
} from './reducers'

export const rootReducer = combineReducers({
    users: usersReducer
});