import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './messages.reducer';

export const getMessagesState = createFeatureSelector<fromReducer.MessagesState>('messages');

export const stateGetPageData = (state: fromReducer.MessagesState) => state.pageData;
export const stateGetIsLoading = (state: fromReducer.MessagesState) => state.isLoading;
export const stateGetMessages = (state: fromReducer.MessagesState) => state.pageData.messages;
export const stateGetFilteredItems = (state: fromReducer.MessagesState) => state.filteredItems;

export const getMessagesPageState = createSelector(
    getMessagesState,
    state => state
);

export const getMessagesPageData = createSelector(
    getMessagesState,
    stateGetPageData
);

export const getMessages = createSelector(
    getMessagesPageState,
    stateGetMessages
);

export const getIsLoading = createSelector(
    getMessagesPageState,
    stateGetIsLoading
);

export const getError = createSelector(
    getMessagesPageState,
    state => state.error
);

export const getFilteredMessages = createSelector(
    getMessagesPageState,
    stateGetFilteredItems
);

export const getMessageById = createSelector(
    getMessagesPageState,
    state => state.pageData.messages.filter(m => +m.id === state.selectedId)[0]
);

export const hasBeenFetched = createSelector(
    getMessagesPageState,
    state => state.hasBeenFetched
);
