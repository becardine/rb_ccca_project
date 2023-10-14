import DefaultFreightCalculator from '../../../domain/entity/defaultFreightCalculator'
import Order from '../../../domain/entity/order'
import OrderPlaced from '../../../domain/event/orderPlaced'
import RepositoryFactory from '../../../domain/factory/repositoryFactory'
import CouponRepository from '../../../domain/repository/couponRepository'
import ItemRepository from '../../../domain/repository/itemRepository'
import OrderRepository from '../../../domain/repository/orderRepository'
import Broker from '../../../infra/broker/broker'
import PlaceOrderInput from './placeOrderInput'
import PlaceOrderOutput from './placeOrderOutput'

export default class PlaceOrder {
	itemRepository: ItemRepository
	couponRepository: CouponRepository
	orderRepository: OrderRepository

	constructor(
		readonly repositoryFactory: RepositoryFactory,
		readonly broker: Broker,
	) {
		this.itemRepository = repositoryFactory.createItemRepository()
		this.couponRepository = repositoryFactory.createCouponRepository()
		this.orderRepository = repositoryFactory.createOrderRepository()
	}

	async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
		const sequence = (await this.orderRepository.count()) + 1
		const order = new Order(
			input.cpf,
			input.date,
			new DefaultFreightCalculator(),
			sequence,
		)
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.findById(orderItem.idItem)
			if (!item) throw new Error('Item not found')
			order.addItem(item, orderItem.quantity)
		}
		if (input.coupon) {
			const coupon = await this.couponRepository.findByCode(input.coupon)
			if (coupon) order.addCoupon(coupon)
		}
		await this.orderRepository.save(order)
		await this.broker.publish(new OrderPlaced(order))
		const total = order.getTotal()
		const output = new PlaceOrderOutput(order.getCode(), total)
		return output
	}
}
