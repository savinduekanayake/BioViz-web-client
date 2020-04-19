import {fetchResults} from '../util/fetch';
import {apiHost} from '../config/config';


function pairAign(algorithm = 1) {
    const url = algorithm === 1 ? apiHost + '/pair/nw' : apiHost + '/pair/sw';
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
