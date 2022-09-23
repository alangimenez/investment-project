const quotesRepository = require('../repository/daos/quotesDao')
const lastValueService = require('../services/lastValueService')
const Quote = require('../models/quote');

class QuotesService {
    constructor() { }

    async deleteAllQuotesByBondName(bondName) {
        return await quotesRepository.eliminarTodos(bondName);
    }

    async saveInfo(arrayQuotes) {
        await lastValueService.deleteAll()
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        for (let i = 0; i < arrayQuotes.length; i++) {
            let quote = new Quote(
                arrayQuotes[i].name,
                hoy.toLocaleDateString(),
                hoy.toLocaleTimeString(),
                parseFloat(arrayQuotes[i].value),
                parseFloat(arrayQuotes[i].lastPrice),
                parseFloat(arrayQuotes[i].volumen)
            )
            lastValueService.saveInfo(quote)
            quotesRepository.subirInfo(quote);
        }
        return {"message": "ok"}
    }
}

const quotesService = new QuotesService()

module.exports = quotesService