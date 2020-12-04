import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { IMessagesService } from '../core/contracts/IMessages.service';
import { MESSAGES_SERVICE } from '../services/identifiers';
import * as fromActions from './messages.actions';
import * as fromReducer from './messages.reducer';

@Injectable()
export class MessagesEffects {
    load$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.MessagesActionTypes.GetMessagesBegin),
            switchMap((action: any) => {
                return this.service.getMessages(action.sorting).pipe(
                    map((data) => fromActions.GetMessagesSuccessAction({ data })),
                    catchError(error => {
                        console.error('Couldn\'t get messages', error);
                        return of(fromActions.GetMessagesFailAction({ errors: error }));
                    })
                );
            })
        )
    );

    setAsRead$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.MessagesActionTypes.SetMessageAsReadBegin),
            switchMap((action: any) => {
                return this.service.setMessageAsRead(action.id).pipe(
                    map((message) => fromActions.SetMessageAsReadSuccessAction({ message })),
                    catchError(error => {
                        console.error('Couldn\'t set message as read', error);
                        return of(fromActions.SetMessageAsReadFailAction({ errors: error }));
                    })
                );
            })
        )
    );

    filter$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.MessagesActionTypes.FilterMessagesBegin),
            withLatestFrom(this.store$),
            switchMap(([action, store]) => {
                const messageList = ( action as any).messageType === 'ALL' ? store.messages.pageData.messages :
                    store.messages.pageData.messages.filter(item => item.readStatus === (( action as any).messageType === 'READ' ? 1 : 0));

                return of(
                    fromActions.FilterMessagesSuccessAction({ messageList })
                );
            }),
        )
    );

    constructor(
        private actions$: Actions,
        private store$: Store<AppState>,
        @Inject(MESSAGES_SERVICE) private service: IMessagesService
    ) { }
}

interface AppState {
    messages: fromReducer.MessagesState;
}
