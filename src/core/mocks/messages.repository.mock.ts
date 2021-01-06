import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IHttpBasicResponse } from '../contracts/IHttpBasicResponse';
import { IMessageApiProps, IMessagesApiResponse, IMessagesRepository } from '../contracts/IMessages.repository';
import { TEST_MESSAGES_API_LIST } from './messages.data';

@Injectable()
export class MockMessagesRepository implements IMessagesRepository {

    readonly responseError: IHttpBasicResponse<null> = {
        status: 'error',
        message: 'Some bad error!',
        statusCode: 500
    };

    getMessages(): Observable<IHttpBasicResponse<IMessagesApiResponse>> {
        const data: IMessagesApiResponse = {
            chart: [],
            messages: TEST_MESSAGES_API_LIST as Array<IMessageApiProps>,
            periods: null,
            totals: {
                total: 0,
                seen: 0,
                new: 0,
            }
        };

        const responseOk: IHttpBasicResponse<IMessagesApiResponse> = {
            data,
            status: 'success'
        };

        return of(responseOk);
    }
    setMessageAsRead(id: number): Observable<IHttpBasicResponse<IMessageApiProps>> {
        const data = TEST_MESSAGES_API_LIST[0] as IMessageApiProps;
        data.read_status = '1';

        const responseOk: IHttpBasicResponse<IMessageApiProps> = {
            data,
            status: 'success'
        };

        return of(responseOk);
    }

}
