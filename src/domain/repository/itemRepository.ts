import Item from '../entity/item'

export default interface ItemRepository {
	findById(idItem: number): Promise<Item | undefined>
}
