class ServiceFields {

    constructor(userFields = [], requestFields = []) {
        this._userFields = userFields;
        this._requestFields = requestFields;
    };

    get userFields() {
        return [].concat(this._userFields);
    };

    get requestFields() {
        return [].concat(this._requestFields);
    };

    addFields(userFields, requestFields) {
        this.setUserFields(userFields);
        this.setRequestFields(requestFields);
    };

    addUserFields(userFields) {
        this._userFields.push(userFields);
    };

    addRequestFields(requestFields) {
        this._requestFields.push(requestFields);
    };
};
