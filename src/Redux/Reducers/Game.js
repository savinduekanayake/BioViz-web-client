export const SeqAReducer = (state='AGCATACGCATCA', action)=>{
    switch (action.type) {
        case 'SET_SEQ_A':
            return action.payload;
        default:
            return state;
    }
};

export const SeqBReducer = (state='GCATCGACTCGCATCG', action)=>{
    switch (action.type) {
        case 'SET_SEQ_B':
            return action.payload;
        default:
            return state;
    }
};
