import ItemDAO from '../../application/dao/itemDAO'
import GetItems from '../../application/query/get_items/getItems'

export default class GetItemsController {
	constructor(readonly itemDAO: ItemDAO) {}

	async execute(params: any, body: any) {
		const getItems = new GetItems(this.itemDAO)
		const items = await getItems.execute()
		return items
	}
}
