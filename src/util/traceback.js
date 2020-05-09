export const getTracebackAlignment = (seqA, seqB, starting, directionPath)=>{
    let alignA='';
    let alignB='';
    const current = [...starting];
    directionPath.forEach((element) => {
        if (element === 'UP') {
            alignA = seqA.charAt(current[0]-1).concat(alignA);
            alignB = '-'.concat(alignB);
            current[0]--;
        } else if (element === 'LEFT') {
            alignA = '-'.concat(alignA);
            alignB = seqB.charAt(current[1]-1).concat(alignB);
            current[1]--;
        } else if (element === 'DIAG') {
            alignA = seqA.charAt(current[0]-1).concat(alignA);
            alignB = seqB.charAt(current[1]-1).concat(alignB);
            current[0]--;
            current[1]--;
        }
    });
    return {algn_a: alignA, algn_b: alignB};
};
