class FieldsService {

    constructor() {
        this._http = new HttpService();
    };

    async getServiceFields() {
        const serviceFields = await this._http
            .get(process.env.GET_SERVICES__BASE_URL + process.env.GET_SERVICES__SERVICE_FIELDS);

        return this._checkValidServiceFields(serviceFields) ?
            new ServiceFields(
                serviceFields._embedded.user_fields,
                serviceFields._embedded.request_fields,
            ) : null;
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
    };
};