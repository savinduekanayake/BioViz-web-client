export const setP1Input = (input)=>{
    return {
        type: 'SET_P1',
        payload: input,
    };
};

export const setP1Range = (input)=>{
    return {
        type: 'SET_P1_RANGE',
        payload: input,
    };
};

export const setP1Name = (input)=>{
    return {
        type: 'SET_P1_NAME',
        payload: input,
    };
};


export const setP2Input = (input)=>{
    return {
        type: 'SET_P2',
        payload: input,
    };
};

export const setP2Range = (input)=>{
    return {
        type: 'SET_P2_RANGE',
        payload: input,
    };
};

export const setP2Name = (input)=>{
    return {
        type: 'SET_P2_NAME',
        payload: input,
    };
};

export const setPAlgo = (algo)=>{
    return {
        type: 'SET_P_ALGO',
        payload: algo,
    };
};
