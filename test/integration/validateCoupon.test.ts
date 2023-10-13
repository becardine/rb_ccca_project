import ValidateCoupon from '../../src/application/usecase/validate_coupon/validateCoupon'
import PgPromiseConnectionAdapter from '../../src/infra/database/pgPromiseConnectionAdapter'
import CouponRepositoryDatabase from '../../src/infra/repository/database/couponRepositoryDatabase'

test('Deve validar um cupom de desconto', async function () {
	const connection = PgPromiseConnectionAdapter.getInstance()
	const couponRepository = new CouponRepositoryDatabase(connection)
	const validateCoupon = new ValidateCoupon(couponRepository)
	const isValid = await validateCoupon.execute('VALE20')
	expect(isValid).toBeTruthy()
})
