export const SnackbarReducer =
    (state = {open: false, message: 'test'}, action) => {
        switch (action.type) {
            case 'SET_SNACKBAR_MESSAGE':
                const prev = {...state};
                prev.message = action.payload.message;
                prev.open = true;
                return prev;

            case 'CLOSE_SNACKBAR':
                const prev2 = {...state};
                prev2.open = false;
                return prev2;

            default:
                return state;
        }
    };
