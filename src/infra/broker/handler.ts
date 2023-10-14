import DomainEvent from './domainEvent'

export default interface Handler {
	name: string
	handle(event: DomainEvent): void
}
