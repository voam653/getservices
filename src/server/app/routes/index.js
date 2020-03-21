const api = require('../api');

module.exports = (app) => {
    app.route('/services/fields').get(api.getServiceFields);
};