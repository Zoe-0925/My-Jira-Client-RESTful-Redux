import { combineReducers } from 'redux';
import ProjectReducer from "./ProjectReducer"
import IssueReducer from "./IssueReducer"
import CommentReducer from "./CommentReducer"
import LabelReducer from "./LabelReducer"
import StatusReducer from "./StatusReducer"
import UserReducer from "./UserReducer"
import FilterReducer from "./FilterReducer"
import { connectRouter } from 'connected-react-router'


const RootReducer = (history) => combineReducers({
    ProjectReducer, IssueReducer, CommentReducer, LabelReducer, StatusReducer, UserReducer,
    FilterReducer,
    router: connectRouter(history),
});

export default RootReducer;