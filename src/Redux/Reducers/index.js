import {modeReducer} from './Mode';
import {P1Reducer, P2Reducer, PAlgoReducer} from './PairAlign';
import {combineReducers} from 'redux';
import {
    MatchScoreReducer, MisMatchPenaltyReducer,
    GapPenaltyReducer,
} from './Score';
import {MSASeqReducer} from './MSA';

const allReducers = combineReducers({
    mode: modeReducer,
    P1: P1Reducer,
    P2: P2Reducer,
    matchScore: MatchScoreReducer,
    mismatchPenalty: MisMatchPenaltyReducer,
    gapPenalty: GapPenaltyReducer,
    MSASeq: MSASeqReducer,
    pAlgo: PAlgoReducer,
});

export default allReducers;
