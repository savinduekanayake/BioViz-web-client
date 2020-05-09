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

export const setGapOpenPenalty = (input)=>{
    return {
        type: 'SET_GAP_OPEN',
        payload: input,
    };
};

export const setGapExtendPenalty = (input)=>{
    return {
        type: 'SET_GAP_EXTEND',
        payload: input,
    };
};

export const setScoringMethod = (input)=>{
    return {
        type: 'SET_SCORING_METHOD',
        payload: input,
    };
};

export const setTracebackPriority = (input)=>{
    return {
        type: 'SET_TRACEBACK_PRIORITY',
        payload: input,
    };
};
