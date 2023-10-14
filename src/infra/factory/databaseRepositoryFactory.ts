import RepositoryFactory from '../../domain/factory/repositoryFactory'
import CouponRepository from '../../domain/repository/couponRepository'
import ItemRepository from '../../domain/repository/itemRepository'
import OrderRepository from '../../domain/repository/orderRepository'
import StockEntryRepository from '../../domain/repository/stockEntryRepository'
import PgPromiseConnectionAdapter from '../database/pgPromiseConnectionAdapter'
import CouponRepositoryDatabase from '../repository/database/couponRepositoryDatabase'
import ItemRepositoryDatabase from '../repository/database/itemRepositoryDatabase'
import OrderRepositoryDatabase from '../repository/database/orderRepositoryDatabase'
import StockEntryRepositoryDatabase from '../repository/database/stockEntryRepositoryDatabase'

export default class DatabaseRepositoryFactory implements RepositoryFactory {
	constructor() {}

	createItemRepository(): ItemRepository {
		return new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
	}

	createCouponRepository(): CouponRepository {
		return new CouponRepositoryDatabase(
			PgPromiseConnectionAdapter.getInstance(),
		)
	}

	createOrderRepository(): OrderRepository {
		return new OrderRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
	}

	createStockEntryRepository(): StockEntryRepository {
		return new StockEntryRepositoryDatabase(
			PgPromiseConnectionAdapter.getInstance(),
		)
	}
}
