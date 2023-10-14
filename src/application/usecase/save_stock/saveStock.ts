import StockEntry from '../../../domain/entity/stockEntry'
import RepositoryFactory from '../../../domain/factory/repositoryFactory'
import StockEntryRepository from '../../../domain/repository/stockEntryRepository'
import SaveStockInput from './saveStockInput'

export default class SaveStock {
	stockEntryRepository: StockEntryRepository

	constructor(readonly repositoryFactory: RepositoryFactory) {
		this.stockEntryRepository = repositoryFactory.createStockEntryRepository()
	}

	async execute(input: SaveStockInput): Promise<void> {
		await this.stockEntryRepository.save(
			new StockEntry(input.idItem, input.operation, input.quantity, new Date()),
		)
	}
}
