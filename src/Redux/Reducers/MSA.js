const initialState = [{key: 0, seq: ''}, {key: 1, seq: ''}];

export const MSASeqReducer = (state = initialState, action)=>{
    switch (action.type) {
        case 'ADD_NEW_MSA':
            const prev = [...state];
            const newKey = prev[prev.length-1].key + 1;
            return [...prev, {key: newKey, seq: ''}];

        case 'SET_MSA':
            const prev_ = [...state];
            for (let i = 0; i < prev_.length; i++) {
                if (action.payload.key === prev_[i].key) {
                    prev_[i].seq = action.payload.seq;
                }
            }
            return prev_;

        default:
            return state;
    }
};
