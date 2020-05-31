export const setSnackBar = (message)=>{
    return {
        type: 'SET_SNACKBAR_MESSAGE',
        payload: {message},
    };
};

export const closeSnackbar = ()=>{
    return {
        type: 'CLOSE_SNACKBAR',
        payload: {},
    };
};
