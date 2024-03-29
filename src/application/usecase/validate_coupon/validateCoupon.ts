import CouponRepository from '../../../domain/repository/couponRepository'
import ValidateCouponOutput from './validateCouponOutput'

export default class ValidateCoupon {
	constructor(readonly couponRepository: CouponRepository) {}

	async execute(code: string): Promise<ValidateCouponOutput> {
		const coupon = await this.couponRepository.findByCode(code)
		if (!coupon) throw new Error('Invalid coupon')
		return new ValidateCouponOutput(coupon.isValid(), coupon.percentage)
	}
}
