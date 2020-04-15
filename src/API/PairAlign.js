import {fetchResults} from '../util/fetch';


function pairAign(algorithm = 1) {
    const url = algorithm === 1 ? 'http://localhost:5000/pair/nw' : 'http://localhost:5000/pair/sw';
    return (
        async (seqA, seqB, match, mismatch, gap, callback) => {
            const data = {match, mismatch, gap};
            data.seq_a = seqA;
            data.seq_b = seqB;
            await fetchResults(url, data, callback, () => {
                callback(undefined);
            });
        }
    );
}

export const fetchNW = pairAign(1);

export const fetchSW = pairAign(2);
