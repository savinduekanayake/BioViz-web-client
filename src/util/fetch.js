export const fetchPost = async (url, data, cb)=>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch(url, options)
    .then(async (res) => {
        if (res.status === 200) {
            const jsonRes = await res.clone().json();
            cb({error: undefined, response: jsonRes});
        } else {
            cb({error: res.status});
        }
    }).catch((err) => {
        cb({error: -1});
    });
};

export const fetchGet = async (url, qParams, cb) =>{
    if (qParams.length >0) {
        url = url.concat('?');
        qParams.forEach((e) => {
            url = url.concat(`${e[0]}=${e[1]}&`);
        });
        url = url.slice(0, -1);
    }
    const options = {
        method: 'GET',

    };
    fetch(url, options)
    .then(async (res) => {
        if (res.status === 200) {
            const jsonRes = await res.clone().json();
            cb({error: undefined, response: jsonRes});
        } else {
            cb({error: res.status});
        }
    }).catch((err) => {
        cb({error: -1});
    });
};
