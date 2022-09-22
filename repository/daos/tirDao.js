const { CrudMongo } = require('../crud/crud');
const tirModel = require('../../models/database/tirMg');
// const { ErrorHandler } = require('../../../error/error');
// const error = new ErrorHandler();

class tirDao extends CrudMongo {
    constructor() {
        super(tirModel)
    }
}

module.exports = {
    tirDao
}