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
