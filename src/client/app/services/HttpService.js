class HttpService {

    get(url) {
        return self.fetch ? this._getFetch(url) : this._getXMLHttpRequest(url);
    };

    _getFetch(url) {
        const headers = new Headers();
        const init = {
            method: 'GET',
            headers: headers,
            cache: 'default',
        };

        return fetch(url, init)
                .then(response => response.json())
                .then(result => {
                    return result;
                })
                .catch(error => {
                    HandleLog.error('An error occurred while trying to get the service fields', error);
                });
    };

    _getXMLHttpRequest(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    };
                };
            };

            xhr.send();
        }).then(result => {
            return result;
        });
    };
};
