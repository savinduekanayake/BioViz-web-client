export const modeReducer = (state = 1, action)=>{
    switch (action.type) {
        case 'SET_MODE':
            return action.payload;

        default:
            return state;
    }
};

export const genomeTypeReducer = (state = 'DNA', action)=>{
    switch (action.type) {
        case 'SET_GENOME_TYPE':
            return action.payload;

        default:
            return state;
    }
};
