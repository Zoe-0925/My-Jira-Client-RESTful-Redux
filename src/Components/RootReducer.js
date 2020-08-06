import { combineReducers } from 'redux';
import ProjectReducer from "./Project/Reducer"
import IssueReducer from "./Issue/Reducer"
import CommentReducer from "./Comment/Reducer"
import LabelReducer from "./Label/Reducer"
import StatusReducer from "./Status/Reducer"
import UserReducer from "./User/Reducer"
import { connectRouter } from 'connected-react-router'


const RootReducer = (history) => combineReducers({
    ProjectReducer, IssueReducer, CommentReducer, LabelReducer, StatusReducer, UserReducer,
    router: connectRouter(history),
});

export default RootReducer;