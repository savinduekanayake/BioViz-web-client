import {fetchResults} from '../util/fetch';
import {apiHost} from '../config/config';


function msa(algorithm = 1) {
    const url = algorithm === 1 ? apiHost+'/msa/progressive' :
     apiHost+'/msa/progressive-optimal';
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
