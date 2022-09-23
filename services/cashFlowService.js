const cashFlowRepository = require('../repository/daos/cashflowDao')

class CashFlowService {
    constructor() {}
    async getCashFlow(bondName) {
        return await cashFlowRepository.leerInfoPorBondname(bondName)
    }

    async saveCashFlow(bondName, cashFlow) {
        return await cashFlowRepository.subirInfo({
            "bondName": bondName,
            "cashFlow": cashFlow
        })
    }
}

const cashFlowService = new CashFlowService()

module.exports = cashFlowService