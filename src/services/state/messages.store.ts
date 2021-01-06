import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MESSAGE_TYPE } from '../../core/contracts/IMessages.repository';
import * as fromActions from '../../store/messages.actions';
import * as fromReducer from '../../store/messages.reducer';
import * as fromSelector from '../../store/messages.selectors';

@Injectable()
export class MessagesStore {
    constructor(public store: Store<fromReducer.MessagesState>) { }

    get Loading$() { return this.store.select(fromSelector.getIsLoading); }

    get Error$() {
        return this.store.select(fromSelector.getError);
    }

    loadMessagesPage(sorting?: 'ASC' | 'DESC') {
        return this.store.dispatch(fromActions.GetMessagesBeginAction({ sorting }));
    }

    get MessagesPageData$() {
        return this.store.select(fromSelector.getMessagesPageData);
    }

    filterMessages(criteria: MESSAGE_TYPE) {
        this.store.dispatch(fromActions.FilterMessagesBeginAction({ messageType: criteria }));
    }
    get FilteredMessages$() {
        return this.store.select(fromSelector.getFilteredMessages);
    }

    MessageById$(messageId: number) {
        this.store.dispatch(fromActions.SelectMessageAction({ messageId }));
        return this.store.select(fromSelector.getMessageById);
    }

    setMessageAsRead(id: number) {
        this.store.dispatch(fromActions.SetMessageAsReadBeginAction({ id }));
    }

    get HasBeenFetched$() {
        return this.store.select(fromSelector.hasBeenFetched);
    }
}
