import {initialData} from '../../Components/MSA/DummyData';

export const MSASeqReducer = (state = initialData, action) => {
    switch (action.type) {
        case 'ADD_NEW_MSA':
            const prev = [...state];
            const newKey = prev[prev.length - 1].key + 1;
            return [...prev, {key: newKey, seq: ''}];

        case 'SET_MSA':
            const prev_ = [...state];
            for (let i = 0; i < prev_.length; i++) {
                if (action.payload.key === prev_[i].key) {
                    prev_[i].seq = action.payload.seq;
                }
            }
            return prev_;
        case 'REMOVE_MSA':
            if (state.length === 1) {
                return state;
            } else {
                const new_ = state.filter((element) => {
                    return element.key !== action.payload.key;
                });
                return new_;
            }


        default:
            return state;
    }
};

export const MSAAlgoReducer = (state = '1', action)=>{
    switch (action.type) {
        case 'SET_MSA_ALGO':
            return action.payload;

        default:
            return state;
    }
};

export const MSAOrderReducer = (state = [], action)=>{
    switch (action.type) {
        case 'SET_MSA_ORDER':
            return action.payload;
        case 'SET_MODE':
        case 'ADD_NEW_MSA':
        case 'SET_MSA':
        case 'REMOVE_MSA':
        case 'SET_MSA_ALGO':
            return [];

        default:
            return state;
    }
};
