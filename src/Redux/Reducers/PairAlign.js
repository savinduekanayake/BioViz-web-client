export const P1Reducer = (state = '', action)=>{
    switch (action.type) {
        case 'SET_P1':
            return action.payload;

        default:
            return state;
    }
};

export const P2Reducer = (state = '', action)=>{
    switch (action.type) {
        case 'SET_P2':
            return action.payload;

        default:
            return state;
    }
};

