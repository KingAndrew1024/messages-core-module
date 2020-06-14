
export interface IMessagesStateError {
    after: 'GET' | 'SET_READ' | 'UNKNOWN'
    error: any
}

export interface IMessagesStateSuccess {
    after: 'GET' | 'SET_READ' | 'UNKNOWN'
}
