import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMessagesRepository } from '../core/contracts/IMessages.repository';
import { IMessagesService } from '../core/contracts/IMessages.service';
import { MessageModel, MessagesPageModel } from '../core/models/message.model';
import { MESSAGES_REPOSITORY } from './identifiers';

@Injectable()
export class MessagesService implements IMessagesService {
    constructor(@Inject(MESSAGES_REPOSITORY) private repository: IMessagesRepository,
        /*private errorHandler: RepositoryErrorHandler*/) { }

    getMessages(sorting?: 'ASC' | 'DESC'): Observable<MessagesPageModel> {

        return this.repository.getMessages().pipe(
            map(response => {
                const messages = !sorting ?
                    response.data.messages
                        .map(m => MessageModel.fromApiResponse(m)) :
                    response.data.messages
                        .map(m => MessageModel.fromApiResponse(m))
                        .sort((a, b) => {
                            return sorting === 'ASC' ?
                                b.timestamp.localeCompare(a.timestamp) :
                                a.timestamp.localeCompare(b.timestamp);
                        });

                return new MessagesPageModel({
                    totals: {
                        total: response.data.totals.total,
                        read: response.data.totals.seen,
                        new: response.data.totals.new
                    },
                    messages,
                    chartPoints: response.data.chart
                });
            })
        );
    }

    setMessageAsRead(id: number): Observable<MessageModel> {
        return this.repository.setMessageAsRead(id).pipe(
            map(response => {
                return MessageModel.fromApiResponse(response.data);
            })
        );
    }

}
