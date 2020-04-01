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
