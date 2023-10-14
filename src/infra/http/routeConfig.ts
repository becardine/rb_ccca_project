import ItemDAO from '../../application/dao/itemDAO'
import OrderDAO from '../../application/dao/orderDAO'
import SimulateFreight from '../../application/usecase/simulate_freight/simulateFreight'
import ValidateCoupon from '../../application/usecase/validate_coupon/validateCoupon'
import DefaultFreightCalculator from '../../domain/entity/defaultFreightCalculator'
import RepositoryFactory from '../../domain/factory/repositoryFactory'
import Broker from '../broker/broker'
import GetItemsController from '../controller/getItemsController'
import GetOrderController from '../controller/getOrderController'
import GetOrdersController from '../controller/getOrdersController'
import PlaceOrderController from '../controller/placeOrderController'
import PgPromiseConnectionAdapter from '../database/pgPromiseConnectionAdapter'
import CouponRepositoryDatabase from '../repository/database/couponRepositoryDatabase'
import ItemRepositoryDatabase from '../repository/database/itemRepositoryDatabase'
import Http from './http'

export default class RouteConfig {
	constructor(
		http: Http,
		repositoryFactory: RepositoryFactory,
		orderDAO: OrderDAO,
		broker: Broker,
		itemDAO: ItemDAO,
	) {
		http.on('/orders', 'post', async function (params: any, body: any) {
			const placeOrderController = new PlaceOrderController(
				repositoryFactory,
				broker,
			)
			return placeOrderController.execute(params, body)
		})

		http.on(
			'/simulateFreight',
			'post',
			async function (params: any, body: any) {
				const simulateFreight = new SimulateFreight(
					new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()),
					new DefaultFreightCalculator(),
				)
				const input = body
				return await simulateFreight.execute(input)
			},
		)

		http.on('/validateCoupon', 'post', async function (params: any, body: any) {
			const validateCoupon = new ValidateCoupon(
				new CouponRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()),
			)
			const input = body
			return await validateCoupon.execute(input.coupon)
		})

		http.on('/orders', 'get', async function (params: any, body: any) {
			const getOrdersController = new GetOrdersController(orderDAO)
			return getOrdersController.execute(params, body)
		})

		http.on('/orders/:code', 'get', async function (params: any, body: any) {
			const getOrderController = new GetOrderController(orderDAO)
			return getOrderController.execute(params, body)
		})

		http.on('/items', 'get', async function (params: any, body: any) {
			const getItemsController = new GetItemsController(itemDAO)
			return getItemsController.execute(params, body)
		})
	}
}
