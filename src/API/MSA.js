import {fetchResults} from '../util/fetch';


function msa(algorithm = 1) {
    const url = algorithm === 1 ? 'http://localhost:5000/msa/progressive' : 'http://localhost:5000/msa/progressive-optimal';
    return (
        async (sequences, match, mismatch, gap, callback) => {
            const data = {sequences, match, mismatch, gap};
            await fetchResults(url, data, callback, () => {
                callback(undefined);
            });
        }
    );
}

export const fetchMSAProgressive = msa(1);

export const fetchMSAProgressiveOptimal = msa(2);
