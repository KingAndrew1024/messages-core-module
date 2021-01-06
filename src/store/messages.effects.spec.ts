import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { IMessagesService, MessageModel, MessagesPageModel } from '../core';
import { AppState, MessagesEffects } from './messages.effects';
import * as fromReducer from './messages.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MessagesStore, MESSAGES_SERVICE } from '../services';
import { MessagesActionTypes } from './messages.actions';

class MockMessagesService {
    getMessages() { }

    setMessageAsRead() { }
}

describe('MessagesEffects', () => {
    let actions$ = new Observable<Action>();
    let effects: MessagesEffects;
    let store: MockStore<AppState>;
    let messagesService: IMessagesService;

    const initialState = { messages: {} };

    const errorString = 'some bad error';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MessagesStore,
                MessagesEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                { provide: MESSAGES_SERVICE, useClass: MockMessagesService }
            ]
        });

        store = TestBed.inject(MockStore);
        effects = TestBed.inject(MessagesEffects);
        messagesService = TestBed.inject(MESSAGES_SERVICE);
    });

    it('Should be created', () => {
        expect(effects).toBeTruthy('MessagesEffects was not created');
    });

    it('load$ should return a GetMessagesSuccess action with the Messages List on success', (done: DoneFn) => {
        const fakeMessagesPageModel = {
            totals: {
                total: 0,
                read: 0,
                new: 0,
            },
            messages: [MessageModel.empty(), MessageModel.empty(), MessageModel.empty(), MessageModel.empty()],
            chartPoints: []
        };

        const spy = spyOn(messagesService, 'getMessages').and.returnValue(of(fakeMessagesPageModel));

        actions$ = of({ type: MessagesActionTypes.GetMessagesBegin });

        effects.load$.subscribe(response => {
            expect(response.type).toEqual(MessagesActionTypes.GetMessagesSuccess);
            expect(((response as any).data as MessagesPageModel).messages.length).toEqual(fakeMessagesPageModel.messages.length);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
    it('load$ should return a GetMessagesFail action with the error object on failure', (done: DoneFn) => {

        const spy = spyOn(messagesService, 'getMessages').and.returnValue(throwError(errorString));

        actions$ = of({ type: MessagesActionTypes.GetMessagesBegin });

        effects.load$.subscribe(response => {
            expect(response.type).toEqual(MessagesActionTypes.GetMessagesFail);
            expect((response as any).errors).toBeDefined();
            expect((response as any).errors).toBe(errorString);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('setAsRead$ should return a SetMessageAsReadSuccess action with the Message on success', (done: DoneFn) => {

        const spy = spyOn(messagesService, 'setMessageAsRead').and.returnValue(of(MessageModel.empty()));

        actions$ = of({ type: MessagesActionTypes.SetMessageAsReadBegin });

        effects.setAsRead$.subscribe(response => {
            expect(response.type).toEqual(MessagesActionTypes.SetMessageAsReadSuccess);
            expect((response as any).message instanceof MessageModel).toBeTruthy();
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
    it('setAsRead$ should return a SetMessageAsReadFail action with the error object on failure', (done: DoneFn) => {

        const spy = spyOn(messagesService, 'setMessageAsRead').and.returnValue(throwError(errorString));

        actions$ = of({ type: MessagesActionTypes.SetMessageAsReadBegin });

        effects.setAsRead$.subscribe(response => {
            expect(response.type).toEqual(MessagesActionTypes.SetMessageAsReadFail);
            expect((response as any).errors).toBeDefined();
            expect((response as any).errors).toBe(errorString);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('filter$ should return a FilterMessagesSuccess action with ALL the Messages on success', (done: DoneFn) => {

        const expectedFilteredList = [
            { id: 123, readStatus: 0 } as MessageModel,
            { id: 456, readStatus: 1 } as MessageModel,
            { id: 789, readStatus: 1 } as MessageModel
        ];

        store.setState({
            messages: {
                ...fromReducer.initialState,
                pageData: {
                    ...fromReducer.initialState.pageData,
                    messages: expectedFilteredList
                }
            }
        });

        actions$ = of({ type: MessagesActionTypes.FilterMessagesBegin, messageType: 'ALL' });

        effects.filter$.subscribe(response => {
            expect(response.type).toEqual(MessagesActionTypes.FilterMessagesSuccess);
            expect((response as any).messageList).toEqual(expectedFilteredList);
            done();
        });
    });
    it('filter$ should return a FilterMessagesSuccess action with the READ Messages on success', (done: DoneFn) => {

        const expectedFilteredList = [
            { id: 123, readStatus: 0 } as MessageModel,
            { id: 456, readStatus: 1 } as MessageModel,
            { id: 789, readStatus: 1 } as MessageModel
        ];

        store.setState({
            messages: {
                ...fromReducer.initialState,
                pageData: {
                    ...fromReducer.initialState.pageData,
                    messages: expectedFilteredList
                }
            }
        });

        actions$ = of({ type: MessagesActionTypes.FilterMessagesBegin, messageType: 'READ' });

        effects.filter$.subscribe(response => {
            expect(response.type).toEqual(MessagesActionTypes.FilterMessagesSuccess);
            expect((response as any).messageList.length).toBe(2);
            done();
        });
    });
    it('filter$ should return a FilterMessagesSuccess action with the NEW Messages on success', (done: DoneFn) => {

        const expectedFilteredList = [
            { id: 123, readStatus: 0 } as MessageModel,
            { id: 456, readStatus: 1 } as MessageModel,
            { id: 789, readStatus: 1 } as MessageModel
        ];

        store.setState({
            messages: {
                ...fromReducer.initialState,
                pageData: {
                    ...fromReducer.initialState.pageData,
                    messages: expectedFilteredList
                }
            }
        });

        actions$ = of({ type: MessagesActionTypes.FilterMessagesBegin, messageType: 'NEW' });

        effects.filter$.subscribe(response => {
            expect(response.type).toEqual(MessagesActionTypes.FilterMessagesSuccess);
            expect((response as any).messageList.length).toBe(1);
            done();
        });
    });
});
