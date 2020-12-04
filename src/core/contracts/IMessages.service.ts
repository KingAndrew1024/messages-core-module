import { Observable } from 'rxjs';
import { MessageModel } from '../models/message.model';

export interface IMessagesService {
    getMessages(sorting?: 'ASC' | 'DESC'): Observable<any>;
    setMessageAsRead(id: number): Observable<MessageModel>;
}
