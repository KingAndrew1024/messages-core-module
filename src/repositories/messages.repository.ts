import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpBasicResponse } from '../core/contracts/IHttpBasicResponse';
import { IMessageApiProps, IMessagesApiResponse, IMessagesRepository } from '../core/contracts/IMessages.repository';
import { AppSettingsService } from '../providers/global-params';

@Injectable()
export class MessagesRepository implements IMessagesRepository {
    readonly BASE_URL = `${this.appSettings.getApiUrl()}/api/${this.appSettings.getInstanceName()}/v1/leads`;

    constructor(
        private httpClient: HttpClient,
        private appSettings: AppSettingsService
    ) { }

    getMessages(): Observable<IHttpBasicResponse<IMessagesApiResponse>> {
        return this.httpClient.get<IHttpBasicResponse<IMessagesApiResponse>>(`${this.BASE_URL}`);
    }

    setMessageAsRead(id: number): Observable<IHttpBasicResponse<IMessageApiProps>> {
        const data = { lead_id: id };

        const urlSearchParams = new URLSearchParams();
        Object.keys(data).forEach((key: string, i: number) => {
            urlSearchParams.append(key, data[key]);
        });
        const body = urlSearchParams.toString();

        return this.httpClient.post<IHttpBasicResponse<IMessageApiProps>>(`${this.BASE_URL}/mark_message_as_read`, body);
    }
}
