import { MessageModel } from '../core/models/message.model';
import { AppState } from './messages.effects';
import * as fromReducer from './messages.reducer';
import {
    stateGetPageData,
    stateGetIsLoading,
    stateGetMessages,
    stateGetFilteredItems,
    getMessageById,
    hasBeenFetched,
    getError,
} from './messages.selectors';

describe('Messages Selectors', () => {
    const expectedMessagesList = [
        { id: 123, readStatus: 0 } as MessageModel,
        { id: 456, readStatus: 1 } as MessageModel,
        { id: 789, readStatus: 0 } as MessageModel
    ];

    const expectedPageData = {
        totals: {
            total: 3,
            read: 0,
            new: 3,
        },
        messages: expectedMessagesList,
        chartPoints: []
    };

    const expectedFilteredItems = [
        { id: 456, readStatus: 1 } as MessageModel,
    ];

    const expectedFakeError = { after: 'UNKNOWN', error: 'some fake error' } as any;

    const state: fromReducer.MessagesState = {
        ...fromReducer.initialState,
        pageData: expectedPageData,
        filteredItems: expectedFilteredItems,
        hasBeenFetched: true,
        error: expectedFakeError
    };

    const pageState: AppState = { messages: state };

    it('stateGetPageData should retrieve state.pageData value', () => {
        expect(stateGetPageData(state)).toBe(expectedPageData);
    });

    it('stateGetIsLoading should retrieve state.isLoading value', () => {
        state.isLoading = true;
        expect(stateGetIsLoading(state)).toBe(true);
    });

    it('stateGetMessages should retrieve state.pageData.messages value', () => {
        expect(stateGetMessages(state)).toBe(expectedMessagesList);
    });

    it('stateGetFilteredItems should retrieve state.filteredItems value', () => {
        expect(stateGetFilteredItems(state)).toBe(expectedFilteredItems);
    });

    it('getError selector should retrieve a State.error', () => {
        expect(getError(pageState)).toBe(expectedFakeError);
    });

    it('getMessageById selector should retrieve a Message', () => {
        pageState.messages.selectedId = 789;

        expect(getMessageById(pageState)).toBe(expectedMessagesList[2]);
    });

    it('hasBeenFetched selector should retrieve state.hasBeenFetched value', () => {
        expect(hasBeenFetched(pageState)).toBe(true);
    });
});
