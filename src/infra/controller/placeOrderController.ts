import PlaceOrder from '../../application/usecase/place_order/placeOrder'
import RepositoryFactory from '../../domain/factory/repositoryFactory'
import Broker from '../broker/broker'

export default class PlaceOrderController {
	constructor(
		readonly repositoryFactory: RepositoryFactory,
		readonly broker: Broker,
	) {}

	async execute(params: any, body: any) {
		const placeOrder = new PlaceOrder(this.repositoryFactory, this.broker)
		const input = body
		if (input.date) input.date = new Date(input.date)
		return await placeOrder.execute(input)
	}
}
