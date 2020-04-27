export default function msaOrderValidate(order, sequencesN) {
    const currentSequences = Array(
        sequencesN).fill().map((_, i) => i + 1,
        );
    const currentSet = new Set(currentSequences);
    if (!(order.length === sequencesN - 1)) {
        return false;
    }
    let flag = true;
    order.forEach((pair, index) => {
        if (!(currentSet.has(pair[0]) &&
            currentSet.has(pair[1]) &&
            pair[2] === sequencesN + index + 1)) {
            flag = false;
        }
        currentSet.delete(pair[0]);
        currentSet.delete(pair[1]);
        currentSet.add(sequencesN + index + 1);
    });
    return flag;
}
