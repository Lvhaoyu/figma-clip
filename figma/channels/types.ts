type msg = {
    type: string
}

interface IMsg extends msg {}

export interface IMessageChannel {
    getName(): string

    handle(msg: IMsg): void
}
