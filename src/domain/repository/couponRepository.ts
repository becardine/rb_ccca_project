import Coupon from '../entity/coupon'

export default interface CouponRepository {
	findByCode(code: string): Promise<Coupon | undefined>
}
