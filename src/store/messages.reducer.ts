import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './messages.actions';
import { MessagesPageModel, MessageModel } from '../core/models/message.model';
import { IMessagesStateError, IMessagesStateSuccess } from '../core/contracts/IStateErrorSuccess';


export interface MessagesState {
    isLoading: boolean
    hasBeenFetched: boolean
    pageData: MessagesPageModel
    filteredItems: MessageModel[]
    selectedId: number
    error: IMessagesStateError,
    success: IMessagesStateSuccess
}

export const initialState: MessagesState = {
    isLoading: false,
    hasBeenFetched: false,
    pageData: MessagesPageModel.empty(),
    filteredItems: [],
    selectedId: null,
    error: null,
    success: null
}

const reducer = createReducer(
    initialState,

    //On Begin Actions
    on(fromActions.GetMessagesBeginAction, (state): MessagesState => ({
        ...state,
        error: null,
        success: null,
        isLoading: true
    })),

    //ON Success Actions
    on(fromActions.GetMessagesSuccessAction, (state, action): MessagesState => ({
        ...state,
        isLoading: false,
        hasBeenFetched: true,
        pageData: {
            ...state.pageData,
            totals: action.data.totals,
            messages: action.data.messages,
            chartPoints: action.data.chartPoints
        },
        error: null,
        success: null
    })),
    on(fromActions.SetMessageAsReadSuccessAction, (state, action): MessagesState => ({
        ...state,
        pageData: {
            ...state.pageData,
            totals: {
                ...state.pageData.totals,
                read: state.pageData.totals.read + 1,
                new: state.pageData.totals.new - 1
            },
            messages: [
                ...((ml) => {
                    let tmp = [...ml];
                    
                    const idx = ml.findIndex((m) => m.id == action.message.id);

                    if(idx !== -1)
                        tmp.splice(idx, 1, action.message)
                    
                    return tmp;
                })(state.pageData.messages),
            ],
            //chartPoints: [...state.pageData.chartPoints]*/
        },
        error: null,
        success: { after: getSuccessActionType(action.type) }
    })),

    //ON Fail Actions
    on(fromActions.GetMessagesFailAction, (state, action): MessagesState => ({
        ...state,
        isLoading: false,
        error: { after: getErrorActionType(action.type), error: action.errors }
    })),
    on(fromActions.SetMessageAsReadFailAction, (state, action): MessagesState => ({
        ...state,
        error: { after: getErrorActionType(action.type), error: action.errors },
    })),

    //FILTER
    on(fromActions.FilterMessagesSuccessAction, (state, action): MessagesState => ({
        ...state,
        filteredItems: action.messageList,
        success: null
    })),

    //SELECT
    on(fromActions.SelectMessageAction, (state, action): MessagesState => ({
        ...state,
        selectedId: action.messageId,
        success: null
    })),
)

function getErrorActionType(type: fromActions.MessagesActionTypes) {

    let action: "GET" | "SET_READ" | "UNKNOWN" = "UNKNOWN";

    switch (type) {
        case fromActions.MessagesActionTypes.GetMessagesFail:
            action = "GET"; break;
        case fromActions.MessagesActionTypes.SetMessageAsReadFail:
            action = "SET_READ"; break;
    }

    return action;
}

function getSuccessActionType(type: fromActions.MessagesActionTypes) {

    let action: "GET" | "SET_READ" | "UNKNOWN" = "UNKNOWN";

    switch (type) {
        case fromActions.MessagesActionTypes.GetMessagesSuccess:
            action = "GET"; break;
        case fromActions.MessagesActionTypes.SetMessageAsReadSuccess:
            action = "SET_READ"; break;
    }

    return action;
}

export function messagesReducer(state: MessagesState | undefined, action: Action) {
    return reducer(state, action);
}