import {DNAsimilaritymatrixdata} from '../../util/DNAmatrixdata';

export const MatchScoreReducer = (state = 1, action) => {
    switch (action.type) {
        case 'SET_MATCH':
            return action.payload;

        default:
            return state;
    }
};

export const MisMatchPenaltyReducer = (state = -1, action) => {
    switch (action.type) {
        case 'SET_MISMATCH':
            return action.payload;

        default:
            return state;
    }
};


export const GapPenaltyReducer = (state = -1, action) => {
    switch (action.type) {
        case 'SET_GAP':
            return action.payload;

        default:
            return state;
    }
};

export const GapOpenPenaltyReducer = (state = -1, action) => {
    switch (action.type) {
        case 'SET_GAP_OPEN':
            return action.payload;

        default:
            return state;
    }
};

export const GapExtendPenaltyReducer = (state = -1, action) => {
    switch (action.type) {
        case 'SET_GAP_EXTEND':
            return action.payload;

        default:
            return state;
    }
};

export const ScoringMethodReducer = (state = 'BASIC', action) => {
    switch (action.type) {
        case 'SET_SCORING_METHOD':
            return action.payload;

        default:
            return state;
    }
};

export const TracebackPriorityReducer = (state = 'LOWROAD', action) => {
    switch (action.type) {
        case 'SET_TRACEBACK_PRIORITY':
            return action.payload;

        default:
            return state;
    }
};

export const SimilarityMatrixNameReducer = (state = 'DEFAULT', action) => {
    switch (action.type) {
        case 'SET_SIMILARITY_MATRIX_NAME':
            return action.payload;

        case 'SET_GENOME_TYPE':
            return 'DEFAULT';

        default:
            return state;
    }
};

export const DNASimilarityMatrixReducer =
    (state = DNAsimilaritymatrixdata, action) => {
        switch (action.type) {
            case 'EDIT_DNA_SIMILARIY_MATRIX':
                const newMatrix = {...state};
                newMatrix[action.payload.identifier] = action.payload.value;
                return newMatrix;

            default:
                return state;
        }
    };
