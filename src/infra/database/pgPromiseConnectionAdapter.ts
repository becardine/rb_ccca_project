import pgp from 'pg-promise'
import Connection from './connection'

export default class PgPromiseConnectionAdapter implements Connection {
	pgp: any
	static instance: PgPromiseConnectionAdapter

	private constructor() {
		this.pgp = pgp()('postgres://docker:docker@localhost:5432/ccca')
	}

	static getInstance() {
		if (!PgPromiseConnectionAdapter.instance) {
			PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter()
		}
		return PgPromiseConnectionAdapter.instance
	}

	async query(statement: string, params: any[]): Promise<any> {
		return this.pgp.query(statement, params)
	}
}
