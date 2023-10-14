import RepositoryFactory from '../../../domain/factory/repositoryFactory'
import StockEntryRepository from '../../../domain/repository/stockEntryRepository'
import StockCalculator from '../../../domain/service/stockCalculator'

export default class GetStock {
	stockEntryRepository: StockEntryRepository

	constructor(readonly repositoryFactory: RepositoryFactory) {
		this.stockEntryRepository = repositoryFactory.createStockEntryRepository()
	}

	async execute(idItem: number): Promise<number> {
		const stockEntries = await this.stockEntryRepository.getByIdItem(idItem)
		const calculator = new StockCalculator()
		return calculator.calculate(stockEntries)
	}
}
