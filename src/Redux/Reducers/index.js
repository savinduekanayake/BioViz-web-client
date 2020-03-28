import {modeReducer} from './Mode'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    mode:modeReducer,
})

export default allReducers;
