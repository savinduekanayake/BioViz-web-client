export const MatchScoreReducer = (state = 1, action)=>{
    switch (action.type) {
        case 'SET_MATCH':
            return action.payload;

        default:
            return state;
    }
};

export const MisMatchPenaltyReducer = (state = -1, action)=>{
    switch (action.type) {
        case 'SET_MISMATCH':
            return action.payload;

        default:
            return state;
    }
};


export const GapPenaltyReducer = (state = -1, action)=>{
    switch (action.type) {
        case 'SET_GAP':
            return action.payload;

        default:
            return state;
    }
};
