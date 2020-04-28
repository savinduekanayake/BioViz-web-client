import {fetchGet} from '../util/fetch';


export const fetchGenomeById = async function(id, callback) {
    // const url = 'https://api.genome.ucsc.edu/list/ucscGenomes';
    const url = `https://rest.ensembl.org/sequence/id/${id}`;
    const qParams = [['content-type', 'application/json']];
    function onSuccess(jsonResp) {
        callback({id: jsonResp.id, seq: jsonResp.seq});
    }
    await fetchGet(url, qParams, onSuccess, () => {
        callback(undefined);
    });
};
