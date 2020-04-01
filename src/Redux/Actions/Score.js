export const setMatchScore = (input)=>{
    return {
        type: 'SET_MATCH',
        payload: input,
    };
};

export const setMisMatchPenalty = (input)=>{
    return {
        type: 'SET_MISMATCH',
        payload: input,
    };
};


export const setGapPenalty = (input)=>{
    return {
        type: 'SET_GAP',
        payload: input,
    };
};
