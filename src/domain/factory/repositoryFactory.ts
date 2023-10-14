import CouponRepository from '../repository/couponRepository'
import ItemRepository from '../repository/itemRepository'
import OrderRepository from '../repository/orderRepository'
import StockEntryRepository from '../repository/stockEntryRepository'

export default interface RepositoryFactory {
	createItemRepository(): ItemRepository
	createCouponRepository(): CouponRepository
	createOrderRepository(): OrderRepository
	createStockEntryRepository(): StockEntryRepository
}
