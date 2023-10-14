import ItemDAO from '../../application/dao/itemDAO'
import Connection from '../database/connection'

export default class ItemDAODatabase implements ItemDAO {
	constructor(readonly connection: Connection) {}

	async findAll(): Promise<any> {
		const items = await this.connection.query('select * from ccca.item', [])
		return items.map(function (item: any) {
			item.idItem = item.id_item
			item.price = parseFloat(item.price)
			return item
		})
	}
}
