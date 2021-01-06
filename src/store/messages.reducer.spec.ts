import * as fromReducer from './messages.reducer';
import * as fromActions from './messages.actions';
import { MessageModel } from '../core';

describe('Messages Reducer', () => {
    const { initialState } = fromReducer;

    const thrownError = 'some bad error';

    describe('On unknown Action', () => {
        it('should return the default state', () => {

            const action = { type: 'Unknown' };

            const state = fromReducer.messagesReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('On Begin Actions', () => {
        it('should set State.isLoading = true', () => {
            const expectedState: fromReducer.MessagesState = {
                ...initialState,
                error: null,
                success: null,
                isLoading: true
            };

            let state: fromReducer.MessagesState;

            const getAction = fromActions.GetMessagesBeginAction({ sorting: 'ASC' });
            state = fromReducer.messagesReducer(initialState, getAction);
            expect(state).toEqual(expectedState);
        });
    });

    describe('On Succees Actions', () => {
        it('GetMessagesSuccessAction should set State.pageData', () => {
            const fakeMessagesPageModel = {
                totals: { total: 0, read: 0, new: 0 },
                messages: [MessageModel.empty(), MessageModel.empty(), MessageModel.empty()],
                chartPoints: []
            };

            const expectedState: fromReducer.MessagesState = {
                ...initialState,
                isLoading: false,
                hasBeenFetched: true,
                pageData: fakeMessagesPageModel,
                error: null,
                success: { after: 'GET' },
            };

            let state: fromReducer.MessagesState;

            const getAction = fromActions.GetMessagesSuccessAction({ data: fakeMessagesPageModel });
            state = fromReducer.messagesReducer(initialState, getAction);
            expect(state).toEqual(expectedState);
        });

        it('SetMessageAsReadSuccessAction should set State.pageData', () => {

            initialState.pageData = {
                totals: {
                    total: 3,
                    read: 0, // <-- this item must be increased
                    new: 3 // <-- this item must be decreased
                },
                messages: [
                    { id: 123, readStatus: 0 } as MessageModel,
                    { id: 456, readStatus: 0 } as MessageModel, // <-- this item must be updated
                    { id: 789, readStatus: 0 } as MessageModel
                ],
                chartPoints: []
            };

            const fakeMessagesModelList = [
                { id: 123, readStatus: 0 } as MessageModel,
                { id: 456, readStatus: 1 } as MessageModel, // <-- the updated item
                { id: 789, readStatus: 0 } as MessageModel
            ];

            const expectedState: fromReducer.MessagesState = {
                ...initialState,
                pageData: {
                    totals: { total: 3, read: 1, new: 2 }, // <-- updated values
                    messages: fakeMessagesModelList,
                    chartPoints: []
                },
                error: null,
                success: { after: 'SET_READ' },
            };

            let state: fromReducer.MessagesState;

            const getAction = fromActions.SetMessageAsReadSuccessAction({ message: fakeMessagesModelList[1] });
            state = fromReducer.messagesReducer(initialState, getAction);
            expect(state).toEqual(expectedState);
        });
    });

    describe('On Fail Actions', () => {
        it('GetMessagesFailAction should set State.error { after: \'GET\', error: any }', () => {
            const expectedState: fromReducer.MessagesState = {
                ...initialState,
                isLoading: false,
                error: { after: 'GET', error: thrownError },
            };

            let state: fromReducer.MessagesState;

            const getAction = fromActions.GetMessagesFailAction({ errors: thrownError });
            state = fromReducer.messagesReducer(initialState, getAction);
            expect(state).toEqual(expectedState);
        });

        it('SetMessageAsReadFailAction should set State.error { after: \'SET_READ\', error: any }', () => {
            const expectedState: fromReducer.MessagesState = {
                ...initialState,
                error: { after: 'SET_READ', error: thrownError },
            };

            let state: fromReducer.MessagesState;

            const getAction = fromActions.SetMessageAsReadFailAction({ errors: thrownError });
            state = fromReducer.messagesReducer(initialState, getAction);
            expect(state).toEqual(expectedState);
        });
    });

    describe('On Filter and Select Actions', () => {
        it('FilterMessagesSuccessAction should set State.filteredItems', () => {
            const messageList = [
                { id: 134 } as MessageModel,
                { id: 456 } as MessageModel
            ];

            const expectedState: fromReducer.MessagesState = {
                ...initialState,
                filteredItems: messageList,
                success: null
            };

            initialState.filteredItems = [
                { id: 987 } as MessageModel,
                { id: 654 } as MessageModel
            ];

            let state: fromReducer.MessagesState;

            const getAction = fromActions.FilterMessagesSuccessAction({ messageList });
            state = fromReducer.messagesReducer(initialState, getAction);
            expect(state).toEqual(expectedState);
        });

        it('SelectMessageAction should set State.selectedId', () => {
            const messageId = 987;

            const expectedState: fromReducer.MessagesState = {
                ...initialState,
                selectedId: messageId,
                success: null
            };

            let state: fromReducer.MessagesState;

            const getAction = fromActions.SelectMessageAction({ messageId });
            state = fromReducer.messagesReducer(initialState, getAction);
            expect(state).toEqual(expectedState);
        });
    });
});
