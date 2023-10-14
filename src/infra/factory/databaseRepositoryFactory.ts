import RepositoryFactory from '../../domain/factory/repositoryFactory'
import CouponRepository from '../../domain/repository/couponRepository'
import ItemRepository from '../../domain/repository/itemRepository'
import OrderRepository from '../../domain/repository/orderRepository'
import PgPromiseConnectionAdapter from '../database/pgPromiseConnectionAdapter'
import CouponRepositoryDatabase from '../repository/database/couponRepositoryDatabase'
import ItemRepositoryDatabase from '../repository/database/itemRepositoryDatabase'
import OrderRepositoryDatabase from '../repository/database/orderRepositoryDatabase'

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
}
