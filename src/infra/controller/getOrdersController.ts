import OrderDAO from '../../application/dao/orderDAO'
import GetOrders from '../../application/query/get_orders/getOrders'

export default class GetOrdersController {
	constructor(readonly orderDAO: OrderDAO) {}

	async execute(params: any, body: any) {
		const getOrders = new GetOrders(this.orderDAO)
		const getOrdersOutput = await getOrders.execute()
		return getOrdersOutput
	}
}
