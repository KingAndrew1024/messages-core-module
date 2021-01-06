import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MessagesStore } from './messages.store';
import * as fromSelector from '../../store/messages.selectors';
import * as fromActions from '../../store/messages.actions';
import { MESSAGE_TYPE } from '../../core/contracts/IMessages.repository';

describe('MessagesStore', () => {
    let store: any;
    let messagesStore: MessagesStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Store,
                    useValue: { select: of(true), dispatch: (val) => { } }
                },
                MessagesStore
            ]
        });

        store = TestBed.inject(Store);
        messagesStore = TestBed.inject(MessagesStore);

        spyOn(store, 'select').and.returnValue(of(true /* any value, we are not testing this result */));
        spyOn(store, 'dispatch').and.callThrough();
    });

    it('Should be created', () => {
        expect(messagesStore).toBeTruthy('MessagesStore not created');
    });

    it('Loading$ shoud call select once with parameter fromSelector.getIsLoading', (done: DoneFn) => {
        messagesStore.Loading$.subscribe(resp => {
            expect(messagesStore.store.select).toHaveBeenCalledTimes(1);
            expect(messagesStore.store.select as any).toHaveBeenCalledWith(fromSelector.getIsLoading);
            done();
        });
    });

    it('Error$ shoud call select once with parameter fromSelector.getError', (done: DoneFn) => {
        messagesStore.Error$.subscribe(_ => {
            expect(messagesStore.store.select).toHaveBeenCalledTimes(1);
            expect(messagesStore.store.select as any).toHaveBeenCalledWith(fromSelector.getError);
            done();
        });
    });

    it('MessagesPageData$ shoud call select once with parameter fromSelector.getMessagesPageData', (done: DoneFn) => {
        messagesStore.MessagesPageData$.subscribe(_ => {
            expect(messagesStore.store.select).toHaveBeenCalledTimes(1);
            expect(messagesStore.store.select as any).toHaveBeenCalledWith(fromSelector.getMessagesPageData);
            done();
        });
    });

    it('FilteredMessages$ shoud call select once with parameter fromSelector.getFilteredMessages', (done: DoneFn) => {
        messagesStore.FilteredMessages$.subscribe(_ => {
            expect(messagesStore.store.select).toHaveBeenCalledTimes(1);
            expect(messagesStore.store.select as any).toHaveBeenCalledWith(fromSelector.getFilteredMessages);
            done();
        });
    });

    it('HasBeenFetched$ shoud call select once with parameter fromSelector.hasBeenFetched', (done: DoneFn) => {
        messagesStore.HasBeenFetched$.subscribe(_ => {
            expect(messagesStore.store.select).toHaveBeenCalledTimes(1);
            expect(messagesStore.store.select as any).toHaveBeenCalledWith(fromSelector.hasBeenFetched);
            done();
        });
    });

    it('MessageById$ shoud call select once with parameter fromSelector.getMessageById', (done: DoneFn) => {
        const messageId =  123;

        messagesStore.MessageById$(messageId).subscribe(_ => {
            expect(messagesStore.store.select).toHaveBeenCalledTimes(1);
            expect(messagesStore.store.select as any).toHaveBeenCalledWith(fromSelector.getMessageById);

            expect(messagesStore.store.dispatch).toHaveBeenCalledTimes(1);
            expect(messagesStore.store.dispatch as any).toHaveBeenCalledWith(fromActions.SelectMessageAction({ messageId }));

            done();
        });
    });

    it('loadMessagesPage shoud call dispatch once with parameter fromActions.GetMessagesBeginAction({ sorting })', (done: DoneFn) => {
        const sorting: 'ASC' | 'DESC' = 'ASC';

        messagesStore.loadMessagesPage(sorting);

        expect(messagesStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(messagesStore.store.dispatch as any).toHaveBeenCalledWith(fromActions.GetMessagesBeginAction({ sorting }));

        done();
    });

    it('loadMessagesPage shoud dispatch once with parameter fromActions.FilterMessagesBeginAction({ messageType })', (done: DoneFn) => {
        const criteria: MESSAGE_TYPE = 'ALL';

        messagesStore.filterMessages(criteria);

        expect(messagesStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(messagesStore.store.dispatch as any).toHaveBeenCalledWith(fromActions.FilterMessagesBeginAction({ messageType: criteria }));

        done();
    });

    it('setMessageAsRead shoud call dispatch once with parameter fromActions.SetMessageAsReadBeginAction({ id })', (done: DoneFn) => {
        const id = 123;

        messagesStore.setMessageAsRead(id);

        expect(messagesStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(messagesStore.store.dispatch as any).toHaveBeenCalledWith(fromActions.SetMessageAsReadBeginAction({ id }));

        done();
    });
});
