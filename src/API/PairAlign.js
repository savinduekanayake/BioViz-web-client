import {fetchResults} from '../util/fetch';

export const fetchNW = async (seqA, seqB, match, mismatch, gap, callback) => {
    const url = 'http://localhost:5000/pair/nw';
    const data = {match, mismatch, gap};
    data.seq_a = seqA;
    data.seq_b = seqB;
    await fetchResults(url, data, callback, () => {
        callback(undefined);
    });
};
