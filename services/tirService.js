const cashFlowRepository = require('../repository/daos/cashflowDao');
const lastValueService = require('../services/lastValueService');
const { irr } = require('node-irr');
const TirModel = require('../models/tirModel')
const TirResponse = require('../models/tirResponse')
const tirRepository = require('../repository/daos/tirDao')
const moment = require('moment'); // require
moment().format(); 

class TirService {
    constructor() {}

    async getTir() {
        const cashFlows = await cashFlowRepository.leerInfo() // ir a service de cashFlow
        let arrayTir = []
        for (let i = 0; i < cashFlows.length; i++) {
            const lastValueBond = await lastValueService.getInfoByBondName(cashFlows[i].bondName);
            cashFlows[i].cashFlow.unshift(-(lastValueBond[0].closePrice -1 +1));
            let tirMonthly = irr(cashFlows[i].cashFlow)
            let tirAnnual = Math.pow(1+tirMonthly, 12)
            let tirAnnualRound = this.roundToTwo(((tirAnnual)-1))
            let tirModel = new TirModel(
                cashFlows[i].bondName, 
                new Date().toLocaleString(), 
                new Date().toLocaleString(), 
                tirAnnualRound)
            tirRepository.subirInfo(tirModel)
            let tirResponse = new TirResponse(
                tirModel.bondName,
                cashFlows[i].company,
                cashFlows[i].start,
                cashFlows[i].finish,
                cashFlows[i].rate-1+1,
                tirModel.date,
                tirModel.time,
                tirModel.tir*100
            )
            arrayTir.push(tirResponse)
        }
        return arrayTir;
    }

    async getTirDaily() {
        const cashFlowsData = await cashFlowRepository.leerInfo() // ir a service de cashFlow
        console.log(cashFlowsData[2].finish)
        const daysDiff = this.diffInDaysBetweenDateAndToday(new Date(cashFlowsData[2].finish))
        const cashFlow = new Array(daysDiff);
        
        const days = []
        for (let i = 0; i < cashFlowsData[2].dateInterest.length; i++) {
            console.log(cashFlowsData[2].dateInterest[i])
            days.push(this.diffInDaysBetweenDateAndToday(new Date(cashFlowsData[2].dateInterest[i])))
            cashFlow[this.diffInDaysBetweenDateAndToday(new Date(cashFlowsData[2].dateInterest[i]))] = cashFlowsData[2].amountInterest[i]
        }
        console.log(days);
        console.log(cashFlow);
    }

    roundToTwo(num) {
        return +(Math.round(num + "e+4")  + "e-4");
    }

    diffInDaysBetweenDateAndToday(date) {
        const today = new Date()
        const finishDate = moment([date.getFullYear(), date.getMonth(), date.getDate()])
        const todayMoment = moment([today.getFullYear(), today.getMonth(), today.getDate()])
        return finishDate.diff(todayMoment, 'days')
    }
}

const tirService = new TirService()

module.exports = tirService