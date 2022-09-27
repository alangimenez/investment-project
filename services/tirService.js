const cashFlowRepository = require('../repository/daos/cashflowDao');
const lastValueService = require('../services/lastValueService');
const { irr } = require('node-irr');
const Tir = require('../models/tir')
const tirRepository = require('../repository/daos/tirDao')

class TirService {
    constructor() {}

    async getTir() {
        const cashFlows = await cashFlowRepository.leerInfo() // ir a service de cashFlow
        let arrayTir = []
        for (let i = 0; i < cashFlows.length; i++) {
            const lastValueBond = await lastValueService.getInfoByBondName(cashFlows[i].bondName);
            cashFlows[i].cashFlow.unshift(-(lastValueBond[0].lastPrice -1 +1));
            let tirMonthly = irr(cashFlows[i].cashFlow)
            let tirAnnual = Math.pow(1+tirMonthly, 12)
            let tirAnnualRound = this.roundToTwo(((tirAnnual)-1))
            let tir = new Tir(cashFlows[i].bondName, new Date().toLocaleString(), new Date().toLocaleString(), tirAnnualRound)
            tirRepository.subirInfo(tir)
            arrayTir.push(tir)
        }
        return arrayTir;
    }

    roundToTwo(num) {
        return +(Math.round(num + "e+4")  + "e-4");
    }
}

const tirService = new TirService()

module.exports = tirService