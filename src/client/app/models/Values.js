class Values {

    constructor(values) {
        this._values = values;
    };

    get values() {
        return [].concat(
            Object.keys(this._values).map((key, index) => {
                return { key, value: Object.values(this._values)[index] }
        }));
    }
};
