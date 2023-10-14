import GetOrder from '../../../src/application/query/get_order/getOrder'
import PlaceOrder from '../../../src/application/usecase/place_order/placeOrder'
import Broker from '../../../src/infra/broker/broker'
import OrderDAODatabase from '../../../src/infra/dao/orderDAODatabase'
import PgPromiseConnectionAdapter from '../../../src/infra/database/pgPromiseConnectionAdapter'
import DatabaseRepositoryFactory from '../../../src/infra/factory/databaseRepositoryFactory'
import OrderRepositoryDatabase from '../../../src/infra/repository/database/orderRepositoryDatabase'

let placeOrder: PlaceOrder
let getOrder: GetOrder
let orderRepository: OrderRepositoryDatabase

beforeEach(function () {
	const connection = PgPromiseConnectionAdapter.getInstance()
	orderRepository = new OrderRepositoryDatabase(connection)
	const repositoryFactory = new DatabaseRepositoryFactory()
	const orderDAO = new OrderDAODatabase(connection)
	const broker = new Broker()
	placeOrder = new PlaceOrder(repositoryFactory, broker)
	getOrder = new GetOrder(orderDAO)
})

test('Deve obter um pedido pelo código', async function () {
	const input = {
		cpf: '839.435.452-10',
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 },
		],
		date: new Date('2021-12-10'),
		coupon: 'VALE20',
	}
	const placeOrderOutput = await placeOrder.execute(input)
	const getOrderOutput = await getOrder.execute(placeOrderOutput.code)
	expect(getOrderOutput.code).toBe('202100000001')
	expect(getOrderOutput.total).toBe(138)
})

afterEach(async function () {
	await orderRepository.clear()
})
