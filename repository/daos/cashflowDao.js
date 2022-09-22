const { CrudMongo } = require('../crud/crud');
const cashflowModel = require('../../models/database/cashflowMg');
// const { ErrorHandler } = require('../../../error/error');
// const error = new ErrorHandler();

class cashflowDao extends CrudMongo {
    constructor() {
        super(cashflowModel)
    }
}

module.exports = {
    cashflowDao
}