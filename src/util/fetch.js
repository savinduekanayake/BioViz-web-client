export const fetchResults = async (url, data, onSuccess, onError)=>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    const res = await fetch(url, options);
    if (res.status === 200) {
        const jsonRes = await res.clone().json();
        onSuccess(jsonRes);
    } else {
        onError();
    }
};

export const fetchGet = async (url, qParams, onSuccess, onError) =>{
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
    const res = await fetch(url, options);
    if (res.status === 200) {
        const jsonRes = await res.clone().json();
        onSuccess(jsonRes);
    } else {
        onError();
    }
};
