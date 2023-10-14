import OrderDAO from '../../dao/orderDAO'
import GetOrdersOutput from './getOrdersOutput'

export default class GetOrders {
	constructor(readonly orderDAO: OrderDAO) {}

	async execute(): Promise<GetOrdersOutput> {
		const ordersData = await this.orderDAO.findAll()
		const getOrdersOutput = new GetOrdersOutput()
		for (const orderData of ordersData) {
			getOrdersOutput.addOrder(orderData.code, orderData.total)
		}
		return getOrdersOutput
	}
}
