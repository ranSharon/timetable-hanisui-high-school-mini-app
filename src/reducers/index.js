import { combineReducers } from "redux";
import timetablesReducers from './timetablesReducers';
import optionsReducers from './optionsReducers';

export default combineReducers({
    timetablesData: timetablesReducers,
    optionsData: optionsReducers
});