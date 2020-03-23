class ServiceFieldsController {

    constructor() {
        this._$ = document.querySelector.bind(document);
        this._fieldsService = new FieldsService();
        this._serviceFields;
        this._serviceFieldsView = new FieldsView(this._$('#contentServices'));
        this._userFieldsView = new FieldsView(this._$('#contentUser'));
        this._getServiceFields();
        this._setStateVisibleElement('#formServices');
    };

    async _getServiceFields() {
        this._serviceFields = await this._fieldsService.getServiceFields();
        this._serviceFieldsView.update(this._serviceFields.requestFields);
        this._userFieldsView.update(this._serviceFields.userFields);
    }

    _setStateVisibleElement(elementName) {
        this._clearStateVisibleElement();
        this._$(elementName).classList.add('is-visible');
    }

    _clearStateVisibleElement() {
        this._$('#formServices').classList.remove('is-visible');
        this._$('#formUser').classList.remove('is-visible');
        this._$('#formSuccess').classList.remove('is-visible');
    }

    setServices(event) {
        event.preventDefault();
        this._setStateVisibleElement('#formUser');
    };

    confirmServices(event) {
        event.preventDefault();
        this._setStateVisibleElement('#formSuccess');
    };

    backToServices(event) {
        event.preventDefault();
        this._setStateVisibleElement('#formServices');
    };

};