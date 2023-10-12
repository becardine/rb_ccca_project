import Coupon from '../../../domain/entity/coupon'
import CouponRepository from '../../../domain/repository/couponRepository'

export default class CouponRepositoryMemory implements CouponRepository {
	coupons: Coupon[]

	constructor() {
		this.coupons = [new Coupon('VALE20', 20)]
	}

	findByCode(code: string): Promise<Coupon | undefined> {
		return Promise.resolve(this.coupons.find((coupon) => coupon.code === code))
	}
}
