export const modeReducer = (state = 1,action)=>{
    switch (action.type) {
        case 'SET_MODE':
            return action.payload            
    
        default:
            return state
    }
}

