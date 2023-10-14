import ItemDAO from '../../dao/itemDAO'

export default class GetItems {
	constructor(readonly itemDAO: ItemDAO) {}

	async execute() {
		return this.itemDAO.findAll()
	}
}
