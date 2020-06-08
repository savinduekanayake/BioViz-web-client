export const setMode = (mode)=>{
    return {
        type: 'SET_MODE',
        payload: mode,
    };
};

export const setGenomeType = (genomeType)=>{
    return {
        type: 'SET_GENOME_TYPE',
        payload: genomeType,
    };
};

export const setDrawerOpen = (openStatus)=>{
    return {
        type: 'SET_DRAWER_OPEN',
        payload: openStatus,
    };
};
