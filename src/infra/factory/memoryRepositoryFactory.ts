import RepositoryFactory from '../../domain/factory/repositoryFactory'
import CouponRepository from '../../domain/repository/couponRepository'
import ItemRepository from '../../domain/repository/itemRepository'
import OrderRepository from '../../domain/repository/orderRepository'
import CouponRepositoryMemory from '../repository/memory/couponRepositoryMemory'
import ItemRepositoryMemory from '../repository/memory/itemRepositoryMemory'
import OrderRepositoryMemory from '../repository/memory/orderRepositoryMemory'

export default class MemoryRepositoryFactory implements RepositoryFactory {
	createItemRepository(): ItemRepository {
		return new ItemRepositoryMemory()
	}

	createCouponRepository(): CouponRepository {
		return new CouponRepositoryMemory()
	}

	createOrderRepository(): OrderRepository {
		return new OrderRepositoryMemory()
	}
}
