export const setGameInputA = (input) => {
    return{
        type : 'SET_SEQ_A',
        payload : input,
    };
};

export const setGameInputB = (input) => {
    return{
        type : 'SET_SEQ_B',
        payload : input,
    };
};