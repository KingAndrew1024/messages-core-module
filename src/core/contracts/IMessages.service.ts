import { Observable } from 'rxjs';
import { MessageModel } from '..';

export interface IMessagesService{
    getMessages(): Observable<any>;
    setMessageAsRead(id: number): Observable<MessageModel>;
}