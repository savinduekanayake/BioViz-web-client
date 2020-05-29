import {fetchPost} from '../util/fetch';
import {apiHost} from '../config/config';


function pairAign(algorithm = 1) {
    const url = algorithm === 1 ? apiHost + '/pair/nw' : apiHost + '/pair/sw';
    return (
        async (seqA, seqB, match, mismatch, gap, callback) => {
            const data = {match, mismatch, gap};
            data.seq_a = seqA;
            data.seq_b = seqB;
            await fetchPost(url, data, callback);
        }
    );
}

function pairAignExtended(algorithm = 1) {
    const url = algorithm === 1 ? apiHost + '/pair/nw-affine' :
        apiHost + '/pair/sw-affine';
    return (
        async (seqA, seqB, match, mismatch, openGap, extendGap,
            priority, genomeType, matrixName, DNAmatrix, callback) => {
            const data = {match, mismatch, priority};
            data.seq_a = seqA;
            data.seq_b = seqB;
            data.opening_gap = openGap;
            data.extending_gap = extendGap;
            data.seq_type = genomeType;
            if (genomeType === 'PROTEIN') {
                data.sub_mat = matrixName;
            } else {
                if (matrixName === 'DEFAULT') {
                    data.sub_mat = 'DEFAULT';
                } else {
                    data.sub_mat = DNAmatrix;
                }
            }
            await fetchPost(url, data, callback);
        }
    );
}

export const fetchNW = pairAign(1);
export const fetchNWExtended = pairAignExtended(1);

export const fetchSW = pairAign(2);
export const fetchSWExtended = pairAignExtended(2);
