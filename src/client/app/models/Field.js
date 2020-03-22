class Field {

    constructor(
        name = '',
        label = '',
        placeholder = '',
        mask = '',
        type = '',
        required = false,
        values = null
    ) {
        this._name = name;
        this._label = label;
        this._placeholder = placeholder;
        this._mask = mask;
        this._type = type;
        this._required = required;
        this._values = values;
    };

    get name() {
        return this._name;
    };

    get label() {
        return this._label;
    };

    get placeholder() {
        return this._placeholder;
    };

    get mask() {
        return this._mask;
    };

    get type() {
        return this._type;
    };

    get required() {
        return this._required;
    };

    get values() {
        return this._values ? (new Values(this._values)).values : this._values;
    };
};
