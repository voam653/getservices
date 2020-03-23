class FieldsView extends View {

    constructor(element) {
       super(element);
    };

    _handleInputTemplate({ name, placeholder, type, required }) {
        return type === 'big_text' ? `
                <textarea
                    ${required ? `required` : ``}
                    class="gs-text-field gs-text-field--textarea"
                    placeholder="${placeholder ? placeholder : ''}"
                    name="${name}"
                ></textarea>
            `
            : `
                <input
                    ${required ? `required` : ``}
                    class="gs-text-field"
                    type="${type}"
                    placeholder="${placeholder ? placeholder : ''}"
                    name="${name}"
                />
            `;
    }

    _handleSelectTemplate({ name, values, required }) {
        return `
            <select class="gs-text-field gs-text-field--select" name="${name}" ${required ? `required` : ``}>
                <option value="" selected> Selecione uma opção </option>
                ${values.map(option => `
                    <option value="${option.key}"> ${option.value} </option>
                `)}
            </select>
      `;
    }

    _handleItemTemplate(fields) {
        return fields.map(field => `
            <li class="gs-list-fields__item">
                <label class="gs-label"> ${field.label} ${field.required ?
                    `
                        <strong class="gs-strong">*</strong>
                    ` : ``}
                </label>

                ${field.type === 'enumerable' ?
                    this._handleSelectTemplate(field) :
                    this._handleInputTemplate(field)
                }

                ${field.required ? `
                    <span class="gs-message gs-message--warning"> Campo inválido! </span>
                ` : ``}
            </li>
        `);
    }

   template(fields) {
        return fields.length ? `
            <ul class="gs-list-fields">
                ${this._handleItemTemplate(fields).join('')}
            </ul>
        ` : `
            <span class="gs-no-fields"> Não foi encontrado nenhum campo </span>
        `;
   };
};