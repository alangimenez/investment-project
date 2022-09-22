const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'cashflow';

const cashflowSchema = new Schema ({
    bondName: {type: String},
    date: {type: Array}
})

const Cashflow = mongoose.model(coleccion, cashflowSchema);

module.exports = Cashflow;