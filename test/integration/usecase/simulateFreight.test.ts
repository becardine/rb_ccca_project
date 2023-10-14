import SimulateFreight from '../../../src/application/usecase/simulate_freight/simulateFreight'
import SimulateFreightInput from '../../../src/application/usecase/simulate_freight/simulateFreightInput'
import DefaultFreightCalculator from '../../../src/domain/entity/defaultFreightCalculator'
import PgPromiseConnectionAdapter from '../../../src/infra/database/pgPromiseConnectionAdapter'
import ItemRepositoryDatabase from '../../../src/infra/repository/database/itemRepositoryDatabase'

test('Deve simular o frete dos itens', async function () {
	const connection = PgPromiseConnectionAdapter.getInstance()
	const itemRepository = new ItemRepositoryDatabase(connection)
	const freightCalculator = new DefaultFreightCalculator()
	const simulateFreight = new SimulateFreight(itemRepository, freightCalculator)
	const input = new SimulateFreightInput([
		{
			idItem: 4,
			quantity: 1,
		},
		{
			idItem: 5,
			quantity: 1,
		},
		{
			idItem: 6,
			quantity: 3,
		},
	])
	const output = await simulateFreight.execute(input)
	expect(output.amount).toBe(260)
})
