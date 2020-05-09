import {modeReducer} from './Mode';
import {P1Reducer, P2Reducer, PAlgoReducer} from './PairAlign';
import {combineReducers} from 'redux';
import {
    MatchScoreReducer, MisMatchPenaltyReducer,
    GapPenaltyReducer,
    GapOpenPenaltyReducer,
    GapExtendPenaltyReducer,
    ScoringMethodReducer,
    TracebackPriorityReducer,
} from './Score';
import {MSASeqReducer, MSAAlgoReducer, MSAOrderReducer} from './MSA';
import {SeqAReducer, SeqBReducer} from './Game';

const allReducers = combineReducers({
    mode: modeReducer,
    P1: P1Reducer,
    P2: P2Reducer,
    matchScore: MatchScoreReducer,
    mismatchPenalty: MisMatchPenaltyReducer,
    gapPenalty: GapPenaltyReducer,
    gapOpenPenalty: GapOpenPenaltyReducer,
    gapExtendPenalty: GapExtendPenaltyReducer,
    scoringMethod: ScoringMethodReducer,
    tracebackPriority: TracebackPriorityReducer,
    MSASeq: MSASeqReducer,
    pAlgo: PAlgoReducer,
    msaAlgo: MSAAlgoReducer,
    msaOrder: MSAOrderReducer,
    GameSeqA: SeqAReducer,
    GameSeqB: SeqBReducer,
});

export default allReducers;
