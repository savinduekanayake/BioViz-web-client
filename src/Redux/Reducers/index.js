import {modeReducer, genomeTypeReducer,
    drawerOpenReducer, themeReducer} from './Mode';
import {P1Reducer, P2Reducer, PAlgoReducer} from './PairAlign';
import {combineReducers} from 'redux';
import {
    MatchScoreReducer, MisMatchPenaltyReducer,
    GapPenaltyReducer,
    GapOpenPenaltyReducer,
    GapExtendPenaltyReducer,
    ScoringMethodReducer,
    TracebackPriorityReducer,
    SimilarityMatrixNameReducer,
    DNASimilarityMatrixReducer,
} from './Score';
import {MSASeqReducer, MSAAlgoReducer, MSAOrderReducer} from './MSA';
import {SeqAReducer, SeqBReducer} from './Game';
import {SnackbarReducer} from './Snackbar';

const allReducers = combineReducers({
    drawerOpen: drawerOpenReducer,
    currentTheme: themeReducer,
    mode: modeReducer,
    genomeType: genomeTypeReducer,
    P1: P1Reducer,
    P2: P2Reducer,
    matchScore: MatchScoreReducer,
    mismatchPenalty: MisMatchPenaltyReducer,
    gapPenalty: GapPenaltyReducer,
    gapOpenPenalty: GapOpenPenaltyReducer,
    gapExtendPenalty: GapExtendPenaltyReducer,
    scoringMethod: ScoringMethodReducer,
    tracebackPriority: TracebackPriorityReducer,
    similarityMatrixName: SimilarityMatrixNameReducer,
    DNASimilarityMatrix: DNASimilarityMatrixReducer,
    MSASeq: MSASeqReducer,
    pAlgo: PAlgoReducer,
    msaAlgo: MSAAlgoReducer,
    msaOrder: MSAOrderReducer,
    GameSeqA: SeqAReducer,
    GameSeqB: SeqBReducer,
    snackBar: SnackbarReducer,
});

export default allReducers;
