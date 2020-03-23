class ServiceFieldsController {

    constructor() {
        this._$ = document.querySelector.bind(document);
        this._fieldsService = new FieldsService();
        this._serviceFields;
        this._serviceFieldsView = new FieldsView(this._$('#contentServices'));
        this._userFieldsView = new FieldsView(this._$('#contentUser'));
        this._getServiceFields();
        this._setStateVisibleElement('services');
    };

    async _getServiceFields() {
        this._serviceFields = await this._fieldsService.getServiceFields();
        this._serviceFieldsView.update(this._serviceFields.requestFields);
        this._userFieldsView.update(this._serviceFields.userFields);
    };

    _setStateVisibleElement(elementName) {
        this._clearStateVisibleElement();
        this._$('.gs-progressive-box').classList.add(`is-${elementName}-visible`);
    };

    _clearStateVisibleElement() {
        this._$('.gs-progressive-box').classList.remove(
            'is-services-visible',
            'is-user-visible',
            'is-success-visible'
        );
    };

    _clearFields(formId) {
        [...this._$(formId).elements].forEach(field => field.value = '');
    };

    _clearAllFields() {
        [...document.querySelectorAll('form')].forEach(form => this._clearFields(`#${form.id}`));
    };

    _clearMessages() {
        [...document.querySelectorAll('.gs-message')].forEach(e => e.classList.remove('is-visible'));
    }

    _handleMessages(invalidFields) {
        invalidFields.forEach(e => this._$(`#${e.form.id} .gs-text-field[name = "${e.name}"] + .gs-message`)
            .classList.add('is-visible'));
    };

    _isInvalided(field) {
        if (field.required && !field.value.length) {
            return true;
        }

        let invalid = false;
        const validator = new ValidatorFields();
        switch (field.name) {
            case 'email':
                invalid = !validator.isValidEmail(field.value);
                break;

            case 'cep':
                invalid = !validator.isValidCEP(field.value);
                break;

            case 'phone':
                invalid = !validator.isValidPhone(field.value);
                break;

            default:
                break;
        }

        return invalid;
    };

    _handleStateVisibleElement(event, elementName) {
        event.preventDefault();
        this._clearMessages();
        const invalidFields = [...event.toElement.form.elements].filter(field => this._isInvalided(field));
        invalidFields.length ? this._handleMessages(invalidFields) :  this._setStateVisibleElement(elementName);
    }

    setServices(event) {
        this._handleStateVisibleElement(event, 'user');
    };

    confirmServices(event) {
        this._handleStateVisibleElement(event, 'success');
    };

    backToServices() {
        this._clearFields('#formUser');
        this._setStateVisibleElement('services');
    };

    remakeOrder() {
        this._clearAllFields();
        this._setStateVisibleElement('services');
    }

};