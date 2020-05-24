export const getSubstring = (data)=>{
    const start = Math.max(0, data.range[0]-1);
    const end = data.range[1];
    return data.seq.slice(start, end);
};
