import {paInput} from '../../Components/PairAlign/DummyData';

export const P1Reducer = (state = paInput.seqA, action)=>{
    switch (action.type) {
        case 'SET_P1':
            const prev1_ = {...state};
            prev1_.seq = action.payload;
            prev1_.range = [Math.min(1, action.payload.length),
                Math.min(100, action.payload.length)];
            return prev1_;

        case 'SET_P1_RANGE':
            const prev1__ = {...state};
            prev1__.range = action.payload;
            return prev1__;

        case 'SET_P1_NAME':
            const prev1___ = {...state};
            prev1___.name = action.payload;
            return prev1___;

        default:
            return state;
    }
};

export const P2Reducer = (state = paInput.seqB, action)=>{
    switch (action.type) {
        case 'SET_P2':
            const prev2_ = {...state};
            prev2_.seq = action.payload;
            prev2_.range = [Math.min(1, action.payload.length),
                Math.min(100, action.payload.length)];
            return prev2_;

        case 'SET_P2_RANGE':
            const prev2__ = {...state};
            prev2__.range = action.payload;
            return prev2__;

        case 'SET_P2_NAME':
            const prev2___ = {...state};
            prev2___.name = action.payload;
            return prev2___;
        default:
            return state;
    }
};

export const PAlgoReducer = (state = 'GLOBAL', action)=>{
    switch (action.type) {
        case 'SET_P_ALGO':
            return action.payload;

        default:
            return state;
    }
};

