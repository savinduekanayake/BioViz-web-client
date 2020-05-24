import {initialData} from '../../Components/MSA/DummyData';

export const MSASeqReducer = (state = initialData, action) => {
    switch (action.type) {
        case 'ADD_NEW_MSA':
            const prev = [...state];
            const newKey = prev[prev.length - 1].key + 1;
            return [...prev,
            {
                key: newKey,
                seq: '',
                range: [0, 0],
                name: `sequence ${newKey + 1}`,
            }];

        case 'SET_MSA':
            const prev_ = [...state];
            for (let i = 0; i < prev_.length; i++) {
                if (action.payload.key === prev_[i].key) {
                    prev_[i].seq = action.payload.seq;
                    prev_[i].range = [Math.min(1, action.payload.seq.length),
                    Math.min(100, action.payload.seq.length)];
                }
            }
            return prev_;

        case 'SET_MSA_RANGE':
            const prev__ = [...state];
            for (let i = 0; i < prev__.length; i++) {
                if (action.payload.key === prev__[i].key) {
                    prev__[i].range = action.payload.range;
                }
            }
            return prev__;

        case 'SET_MSA_NAME':
            const prev___ = [...state];
            for (let i = 0; i < prev___.length; i++) {
                if (action.payload.key === prev___[i].key) {
                    prev___[i].name = action.payload.name;
                }
            }
            return prev___;

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

export const MSAAlgoReducer = (state = '1', action) => {
    switch (action.type) {
        case 'SET_MSA_ALGO':
            return action.payload;

        default:
            return state;
    }
};

export const MSAOrderReducer = (state = [], action) => {
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
