import Order from '../../domain/entity/order'
import CouponRepository from '../../domain/repository/couponRepository'
import ItemRepository from '../../domain/repository/itemRepository'
import OrderRepository from '../../domain/repository/orderRepository'
import PlaceOrderInput from './placeOrderInput'
import PlaceOrderOutput from './placeOrderOutput'

export default class PlaceOrder {
	constructor(
		readonly itemRepository: ItemRepository,
		readonly orderRepository: OrderRepository,
		readonly couponRepository: CouponRepository,
	) {}

	async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
		const order = new Order(input.cpf, input.date)
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
		const total = order.getTotal()
		const output = new PlaceOrderOutput(total)
		return output
	}
}
