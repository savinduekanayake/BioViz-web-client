import {fetchPost} from '../util/fetch';
import {apiHost} from '../config/config';

export const fetchMSAProgressive = async function(
    sequences, order, match, mismatch, gap,
    genomeType, matrixName, DNAmatrix, callback) {
    const url = apiHost + '/msa/progressive';
    const data = {sequences, match, mismatch, gap};
    const formattedOrder = order.map((element) => {
        return [element[0], element[1]];
    });
    data.order = formattedOrder;

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
};

export const fetchMSAProgressiveOptimal = async function(
    sequences, match, mismatch, gap, genomeType,
    matrixName, DNAmatrix, callback) {
    const url = apiHost + '/msa/progressive-optimal';
    const data = {sequences, match, mismatch, gap};

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
};
