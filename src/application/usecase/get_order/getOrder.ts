import RepositoryFactory from '../../../domain/factory/repositoryFactory'
import OrderRepository from '../../../domain/repository/orderRepository'
import GetOrderOutput from './getOrderOutput'

export default class GetOrder {
	orderRepository: OrderRepository

	constructor(readonly repositoryFactory: RepositoryFactory) {
		this.orderRepository = repositoryFactory.createOrderRepository()
	}

	async execute(code: string): Promise<GetOrderOutput> {
		const order = await this.orderRepository.get(code)
		const getOrderOutput = new GetOrderOutput(order.getCode(), order.getTotal())
		return getOrderOutput
	}
}
