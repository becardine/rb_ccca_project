import OrderDAO from '../../dao/orderDAO'
import GetOrderOutput from './getOrderOutput'

export default class GetOrder {
	constructor(readonly orderDAO: OrderDAO) {}

	async execute(code: string): Promise<GetOrderOutput> {
		const [orderData] = await this.orderDAO.get(code)
		const getOrderOutput = new GetOrderOutput(orderData.code, orderData.total)
		return getOrderOutput
	}
}
