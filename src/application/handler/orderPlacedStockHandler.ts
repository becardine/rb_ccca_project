import StockEntry from '../../domain/entity/stockEntry'
import OrderPlaced from '../../domain/event/orderPlaced'
import RepositoryFactory from '../../domain/factory/repositoryFactory'
import StockEntryRepository from '../../domain/repository/stockEntryRepository'
import Handler from '../../infra/broker/handler'

export default class OrderPlacedStockHandler implements Handler {
	name = 'OrderPlaced'
	stockEntryRepository: StockEntryRepository

	constructor(readonly repositoryFactory: RepositoryFactory) {
		this.stockEntryRepository = repositoryFactory.createStockEntryRepository()
	}

	handle(event: OrderPlaced): void {
		for (const orderItem of event.order.getOrderItems()) {
			this.stockEntryRepository.save(
				new StockEntry(
					orderItem.idItem,
					'out',
					orderItem.quantity,
					event.order.date,
				),
			)
		}
	}
}
