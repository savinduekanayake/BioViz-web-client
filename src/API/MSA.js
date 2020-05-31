import {fetchPost} from '../util/fetch';
import {apiHost} from '../config/config';

export const fetchMSAProgressive = async function(
    sequences, order, match, mismatch, gap, callback) {
    const url = apiHost + '/msa/progressive';
    const data = {sequences, match, mismatch, gap};
    const formattedOrder = order.map((element) => {
        return [element[0], element[1]];
    });
    data.order = formattedOrder;
    await fetchPost(url, data, callback);
};

export const fetchMSAProgressiveOptimal = async function(
    sequences, match, mismatch, gap, callback) {
    const url = apiHost + '/msa/progressive-optimal';
    const data = {sequences, match, mismatch, gap};
    await fetchPost(url, data, callback);
};
