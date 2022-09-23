const lastValueRepository = require('../repository/daos/lastValueDao')

class LastValueService {
    constructor() {}

    async deleteAll() {
        await lastValueRepository.eliminarTodos()
    }

    async saveInfo(lastValue) {
        await lastValueRepository.subirInfo(lastValue)
    }

    async getInfoByBondName(bondName) {
        await lastValueRepository.leerInfoPorBondname(bondName)
    }
}

const lastValueService = new LastValueService()

module.exports = lastValueService