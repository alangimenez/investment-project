const cashFlowRepository = require('../repository/daos/cashflowDao');
const lastValueService = require('../services/lastValueService');

class TirService {
    constructor() {}

    async getTir() {
        const cashFlows = await cashFlowRepository.leerInfo()
        for (let i = 0; i < cashFlows.length; i++) {
            const lastValueBond = await lastValueService.getInfoByBondName(cashFlows[i].bondName)
        }
        return cashFlows;
    }
}

const tirService = new TirService()

module.exports = tirService