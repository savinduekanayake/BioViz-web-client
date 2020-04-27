export const addNewMSA = ()=>{
    return {
        type: 'ADD_NEW_MSA',
    };
};

export const setMSAInput = (seq, key)=>{
    return {
        type: 'SET_MSA',
        payload: {seq: seq, key: key},
    };
};

export const removeMSA = (key)=>{
    return {
        type: 'REMOVE_MSA',
        payload: {key},
    };
};

export const setMSAAlgo = (algo)=>{
    return {
        type: 'SET_MSA_ALGO',
        payload: algo,
    };
};

export const setMSAOrder = (order)=>{
    return {
        type: 'SET_MSA_ORDER',
        payload: order,
    };
};
