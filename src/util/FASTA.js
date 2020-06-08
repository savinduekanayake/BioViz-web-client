

export const parseFASTA = function(raw) {
    return new Promise((resolve, reject) => {
        if (raw.charAt(0)!=='>') {
            resolve({description: '', sequence: '', status: false});
            return;
        }
        raw = raw.trim();
        const splitted = raw.split('\n');
        if (splitted.length<2) {
            resolve({description: '', sequence: '', status: false});
            return;
        }
        const description = splitted.shift().slice(1).trim();
        const sequence = splitted.join('').replace(
            /(\r\n|\n|\r)/gm, '').trim().toUpperCase();

        const pattern = /^[A-Za-z]+$/;
        const testStatus = sequence.match(pattern);

        if (testStatus) {
            resolve({description, sequence, status: true});
            return;
        } else {
            resolve({description: '', sequence: '', status: false});
        }
    });
};
