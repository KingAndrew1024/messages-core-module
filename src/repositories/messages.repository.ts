import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '../providers/global-params';
import { IHttpBasicResponse, IMessagesRepository, IMessagesApiResponse, IMessageApiProps } from '..';

@Injectable()
export class MessagesRepository implements IMessagesRepository {
    readonly BASE_URL = `${Params.getApiUrl()}/api/${Params.getInstanceName()}/v1/leads`;
    
    constructor(private httpClient: HttpClient) { }

    getMessages(): Observable<IHttpBasicResponse<IMessagesApiResponse>>{
        //console.log("--- EXECUTING MessagesRepository.getMessages()");
        return this.httpClient.get<IHttpBasicResponse<IMessagesApiResponse>>(`${this.BASE_URL}`)
    }

    setMessageAsRead(id: number): Observable<IHttpBasicResponse<IMessageApiProps>>{
        //console.log("--- EXECUTING MessagesRepository.setMessageAsRead()");

        let data = { lead_id: id }

        let urlSearchParams = new URLSearchParams();
        Object.keys(data).forEach((key: string, i: number) => {
            urlSearchParams.append(key, data[key]);
        });
        const body = urlSearchParams.toString()

        return this.httpClient.post<IHttpBasicResponse<IMessageApiProps>>(`${this.BASE_URL}/mark_message_as_read`, body)
    }
}