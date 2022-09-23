const lastValueRepository = require('../repository/daos/lastValueDao')

class LastValueService {
    constructor() {}

    async deleteAll() {
        await lastValueRepository.eliminarTodos()
    }

    async saveInfo(lastValue) {
        await lastValueRepository.subirInfo(lastValue)
    }
}

const lastValueService = new LastValueService()

module.exports = lastValueService