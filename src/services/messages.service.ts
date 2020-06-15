import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMessagesService } from '../core/contracts/IMessages.service';
import { MessagesRepository } from '../repositories/messages.repository';
import { MessagesPageModel, MessageModel } from '../core/models/message.model';



@Injectable()
export class MessagesService implements IMessagesService{
    constructor(private repository: MessagesRepository,
        /*private errorHandler: RepositoryErrorHandler*/){}

    getMessages(): Observable<MessagesPageModel> {
        return this.repository.getMessages().pipe(
            map(response => {
                //this.errorHandler.handle(response);

                return new MessagesPageModel({
                    totals: {
                        total: response.data.totals.total,
                        read: response.data.totals.seen,
                        new: response.data.totals.new
                    },
                    messages: response.data.messages.map(m => MessageModel.fromApiResponse(m)),
                    chartPoints: response.data.chart
                })
            })
        )
    }

    setMessageAsRead(id: number): Observable<MessageModel>{
        return this.repository.setMessageAsRead(id).pipe(
            map(response => {
                
                //this.errorHandler.handle(response);

                return MessageModel.fromApiResponse(response.data)
            })
        )
    }
    
}