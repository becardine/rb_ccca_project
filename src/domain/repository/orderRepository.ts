import Order from '../entity/order'

export default interface OrderRepository {
	save(order: Order): Promise<void>
	count(): Promise<number>
	clear(): Promise<void>
}
