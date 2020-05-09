export const modeReducer = (state = 0, action)=>{
    switch (action.type) {
        case 'SET_MODE':
            return action.payload;

        default:
            return state;
    }
};

