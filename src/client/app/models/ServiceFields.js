class ServiceFields {

    constructor(userFields = [], requestFields = []) {
        this._userFields = userFields.length ? this.createListFields(userFields) : userFields;
        this._requestFields = requestFields.length ? this.createListFields(requestFields) : requestFields;
    };

    get userFields() {
        return [].concat(this._userFields);
    };

    get requestFields() {
        return [].concat(this._requestFields);
    };

    createListFields(fields) {
        fields.map(field => new Field(
            field.name,
            field.label,
            field.placeholder,
            field.mask,
            field.type,
            field.required,
            field.values,
        ));
    }

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
