import Coupon from '../../src/domain/entity/coupon'

test('Deve criar um cupom de desconto válido', function () {
	const coupon = new Coupon('VALE20', 20, new Date('2023-10-11'))
	const today = new Date('2023-10-01')
	const isValid = coupon.isValid(today)
	expect(isValid).toBeTruthy()
})

test('Não deve criar um cupom de desconto expirado', function () {
	const coupon = new Coupon('VALE20', 20, new Date('2023-07-01'))
	const today = new Date('2023-10-01')
	const isExpired = coupon.isExpired(today)
	expect(isExpired).toBeTruthy()
})

test('Deve criar um cupom de desconto válido e calcular o desconto', function () {
	const coupon = new Coupon('VALE20', 20)
	const discount = coupon.calculateDiscount(1000)
	expect(discount).toBe(200)
})
