import { createAction, props } from '@ngrx/store';
import { MESSAGE_TYPE } from '../core/contracts/IMessages.repository';
import { MessageModel, MessagesPageModel } from '../core/models/message.model';

export enum MessagesActionTypes {
    GetMessagesBegin = '[Messages] Get Messages begin',
    GetMessagesSuccess = '[Messages] Get Messages success',
    GetMessagesFail = '[Messages] Get Messages failure',

    SetMessageAsReadBegin = '[Messages] Set Messages as Read begin',
    SetMessageAsReadSuccess = '[Messages] Set Messages as Read success',
    SetMessageAsReadFail = '[Messages] Set Messages as Read failure',

    FilterMessagesBegin = '[Messages] Filter message begin',
    FilterMessagesSuccess = '[Messages] Filter message success',

    SelectMessage = '[Messages] Select message',
}

// GET Messages from remote API
export const GetMessagesBeginAction = createAction(
    MessagesActionTypes.GetMessagesBegin,
    props<{ sorting?: 'ASC' | 'DESC' }>()
);

export const GetMessagesSuccessAction = createAction(
    MessagesActionTypes.GetMessagesSuccess,
    props<{ data: MessagesPageModel }>()
);

export const GetMessagesFailAction = createAction(
    MessagesActionTypes.GetMessagesFail,
    props<{ errors: any }>()
);

// SET AS READ
export const SetMessageAsReadBeginAction = createAction(
    MessagesActionTypes.SetMessageAsReadBegin,
    props<{ id: number }>()
);

export const SetMessageAsReadSuccessAction = createAction(
    MessagesActionTypes.SetMessageAsReadSuccess,
    props<{ message: MessageModel }>()
);

export const SetMessageAsReadFailAction = createAction(
    MessagesActionTypes.SetMessageAsReadFail,
    props<{ errors: any }>()
);

// FILTERING
export const FilterMessagesBeginAction = createAction(
    MessagesActionTypes.FilterMessagesBegin,
    props<{ messageType: MESSAGE_TYPE }>()
);

export const FilterMessagesSuccessAction = createAction(
    MessagesActionTypes.FilterMessagesSuccess,
    props<{ messageList: MessageModel[] }>()
);

export const SelectMessageAction = createAction(
    MessagesActionTypes.SelectMessage,
    props<{ messageId: number }>()
);
