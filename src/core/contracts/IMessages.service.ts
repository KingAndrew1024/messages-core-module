import { Observable } from 'rxjs';
import { MessageModel, MessagesPageModel } from '../models/message.model';

export interface IMessagesService {
    getMessages(sorting?: 'ASC' | 'DESC'): Observable<MessagesPageModel>;
    setMessageAsRead(id: number): Observable<MessageModel>;
}
