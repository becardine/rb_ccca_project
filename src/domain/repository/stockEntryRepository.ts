import StockEntry from '../entity/stockEntry'

export default interface StockEntryRepository {
	getByIdItem(idItem: number): Promise<StockEntry[]>
	save(stockEntry: StockEntry): Promise<void>
	clear(): Promise<void>
}
