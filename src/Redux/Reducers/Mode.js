export const modeReducer = (state = 0, action)=>{
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

export const drawerOpenReducer = (state = false, action)=>{
    switch (action.type) {
        case 'SET_DRAWER_OPEN':
            return action.payload;

        default:
            return state;
    }
};

export const themeReducer = (state = 'light', action)=>{
    switch (action.type) {
        case 'SET_THEME':
            return action.payload;

        default:
            return state;
    }
};
