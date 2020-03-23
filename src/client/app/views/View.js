class View {

    constructor(element) {
        this._element = element;
    };

    template() {
        HandleLog.error('The template method must be implemented');
    };

    update(model) {
        this._element.innerHTML = this.template(model);
    };
};