import { combineReducers } from 'redux';
import ProjectReducer from "./Project/Reducer"
import IssueReducer from "./Issue/Reducer"
import CommentReducer from "./Comment/Reducer"
import LabelReducer from "./Label/Reducer"
import StatusReducer from "./Status/Reducer"
import UserReducer from "./User/Reducer"

const RootReducer = combineReducers({
    ProjectReducer, IssueReducer, CommentReducer, LabelReducer, StatusReducer, UserReducer
});

export default RootReducer;