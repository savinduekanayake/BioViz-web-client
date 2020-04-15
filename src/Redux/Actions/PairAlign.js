export const setP1Input = (input)=>{
    return {
        type: 'SET_P1',
        payload: input,
    };
};

export const setP2Input = (input)=>{
    return {
        type: 'SET_P2',
        payload: input,
    };
};

export const setPAlgo = (algo)=>{
    return {
        type: 'SET_P_ALGO',
        payload: algo,
    };
};
