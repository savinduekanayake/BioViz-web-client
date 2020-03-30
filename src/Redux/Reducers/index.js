import {modeReducer} from './Mode'
import {P1Reducer,P2Reducer} from './PairAlign'
import {combineReducers} from 'redux';
import { MatchScoreReducer, MisMatchPenaltyReducer,GapPenaltyReducer } from './Score';

const allReducers = combineReducers({
    mode:modeReducer,
    P1:P1Reducer,
    P2:P2Reducer,
    matchScore:MatchScoreReducer,
    mismatchPenalty:MisMatchPenaltyReducer,
    gapPenalty:GapPenaltyReducer
})

export default allReducers;
