import Coupon from '../../../domain/entity/coupon'
import CouponRepository from '../../../domain/repository/couponRepository'
import Connection from '../../database/connection'

export default class CouponRepositoryDatabase implements CouponRepository {
	constructor(readonly connection: Connection) {}

	async findByCode(code: string): Promise<Coupon | undefined> {
		const [couponData] = await this.connection.query(
			'select * from ccca.coupon where code = $1',
			[code],
		)
		if (!couponData) return
		return new Coupon(
			couponData.code,
			couponData.percentage,
			couponData.expire_date,
		)
	}
}
