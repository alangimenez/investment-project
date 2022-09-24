const cashFlowRepository = require('../repository/daos/cashflowDao');
const lastValueService = require('../services/lastValueService');
const { irr } = require('node-irr');

class TirService {
    constructor() {}

    async getTir() {
        const cashFlows = await cashFlowRepository.leerInfo() // ir a service de cashFlow
        for (let i = 0; i < cashFlows.length; i++) {
            const lastValueBond = await lastValueService.getInfoByBondName(cashFlows[i].bondName);
            cashFlows[i].cashFlow.unshift(-(lastValueBond[0].lastPrice -1 +1));
            console.log(irr(cashFlows[i].cashFlow))
            console.log(Math.pow(1+irr(cashFlows[i].cashFlow), 12))
            console.log(Math.round(((Math.pow(1+irr(cashFlows[i].cashFlow), 12)-1))*100))
            console.log(this.roundToTwo(((Math.pow(1+irr(cashFlows[i].cashFlow), 12)-1))))
            // console.log(irr(data[0].cashFlow))
            // console.log(lastValueBond[0].lastPrice);
        }
        return cashFlows;
    }

    roundToTwo(num) {
        return +(Math.round(num + "e+4")  + "e-4");
    }
}

const tirService = new TirService()

module.exports = tirService