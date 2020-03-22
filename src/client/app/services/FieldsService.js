class FieldsService {

    constructor() {
        this._http = new HttpService();
    };

    getServiceFields() {
        return this._http
            .get('services/fields')
            .then(serviceFields => {
                console.log(serviceFields);
                return this._checkValidServiceFields(serviceFields) ?
                    new ServiceFields(
                        serviceFields._embedded.user_fields,
                        serviceFields._embedded.request_fields,
                    ) : null;
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('An error occurred while trying to get the service fields');
            });
    };

    _checkValidServiceFields(serviceFields) {
        return (
            serviceFields &&
            serviceFields._embedded &&
            serviceFields._embedded.request_fields &&
            serviceFields._embedded.user_fields &&
            serviceFields._embedded.request_fields.length &&
            serviceFields._embedded.user_fields.length
        );
    }
};