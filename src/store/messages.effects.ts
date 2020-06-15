import { Injectable, Inject } from '@angular/core';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromActions from './messages.actions';
import * as fromReducer from './messages.reducer';
import { MESSAGES_SERVICE } from '../services/identifiers';
import { IMessagesService } from '../core/contracts/IMessages.service';


@Injectable()
export class MessagesEffects {
    load$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.MessagesActionTypes.GetMessagesBegin),
            switchMap(() => {
                return this.service.getMessages().pipe(
                    map((data) => fromActions.GetMessagesSuccessAction({ data })),
                    catchError(error => {
                        console.error("Couldn't get messages", error);
                        return of(fromActions.GetMessagesFailAction({ errors: error }));
                    })
                )
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
                        console.error("Couldn't set message as read", error);
                        return of(fromActions.SetMessageAsReadFailAction({ errors: error }));
                    })
                )
            })
        )
    );

    filter$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.MessagesActionTypes.FilterMessagesBegin),
            withLatestFrom(this.store$),
            switchMap(([action, store]) => {
                let messageList = (<any>action).messageType == "ALL" ? store.messages.pageData.messages :
                    store.messages.pageData.messages.filter(item => item.readStatus == ((<any>action).messageType == "READ" ? 1 : 0));

                return of(
                    fromActions.FilterMessagesSuccessAction({ messageList })
                );
            }),
        )
    )

    constructor(
        private actions$: Actions,
        private store$: Store<AppState>,
        @Inject(MESSAGES_SERVICE) private service: IMessagesService
    ) { }
}

 interface AppState {
    messages: fromReducer.MessagesState,
}