export default function validateSequence(sequence, type) {
    if (sequence ==='') {
        return true;
    }
    let pattern;
    if (type==='DNA') {
        pattern = /^[AGCTagct]+$/;
    } else {
        pattern = /^[ABCDEFGHIKLMNPQRSTVWXYZabcdefghiklmnpqrstvwxyz]+$/;
    }

    const testStatus = sequence.match(pattern);
    if (testStatus) {
        return true;
    } else {
        return false;
    }
}
