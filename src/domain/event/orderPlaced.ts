import DomainEvent from '../../infra/broker/domainEvent'
import Order from '../entity/order'

export default class OrderPlaced implements DomainEvent {
	name = 'OrderPlaced'

	constructor(readonly order: Order) {}
}
