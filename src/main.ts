import Broker from './infra/broker/broker'
import ItemDAODatabase from './infra/dao/itemDAODatabase'
import OrderDAODatabase from './infra/dao/orderDAODatabase'
import PgPromiseConnectionAdapter from './infra/database/pgPromiseConnectionAdapter'
import DatabaseRepositoryFactory from './infra/factory/databaseRepositoryFactory'
import ExpressAdapter from './infra/http/expressAdapter'
import RouteConfig from './infra/http/routeConfig'

const repositoryFactory = new DatabaseRepositoryFactory()
const connection = PgPromiseConnectionAdapter.getInstance()
const orderDAO = new OrderDAODatabase(connection)
const itemDAO = new ItemDAODatabase(connection)
const expressAdapter = new ExpressAdapter()
const broker = new Broker()
new RouteConfig(expressAdapter, repositoryFactory, orderDAO, broker, itemDAO)
expressAdapter.listen(3000)
