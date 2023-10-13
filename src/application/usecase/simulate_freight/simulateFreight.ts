import FreightCalculator from '../../../domain/entity/freightCalculator'
import ItemRepository from '../../../domain/repository/itemRepository'
import SimulateFreightInput from './simulateFreightInput'
import SimulateFreightOutput from './simulateFreightOutput'

export default class SimulateFreight {
	constructor(
		readonly itemRepository: ItemRepository,
		readonly freightCalculator: FreightCalculator,
	) {}

	async execute(input: SimulateFreightInput): Promise<SimulateFreightOutput> {
		let amount = 0
		for (const inputItem of input.items) {
			const item = await this.itemRepository.findById(inputItem.idItem)
			if (!item) throw new Error('Item not found')
			amount += this.freightCalculator.calculate(item) * inputItem.quantity
		}
		return new SimulateFreightOutput(amount)
	}
}
