import { Observable } from 'rxjs';
import { IHttpBasicResponse } from './IHttpBasicResponse';

export interface IMessagesRepository {
    getMessages(): Observable<IHttpBasicResponse<IMessagesApiResponse>>;
    setMessageAsRead(id: number): Observable<IHttpBasicResponse<IMessageApiProps>>;
}

export interface IMessagesApiResponse {
    totals: {
        total: number,
        seen: number,
        new: number
    },
    periods:{
        today: IPeriodPoint
        yesterday: IPeriodPoint
        seven_days: IPeriodPoint
        thirty_days: IPeriodPoint
        this_month: IPeriodPoint
        last_month: IPeriodPoint
        all: IPeriodPoint
    }
    messages: Array<IMessageApiProps>
    chart: Array<number>
}

interface IPeriodPoint{
    pointStart: number
    begin: number
    end: number
}

export interface IMessageApiProps{
    created_at?:string
    data_email?:string
    data_message?: string
    data_name?: string
    data_phone?: string

    id: string
    message: string
    name: string
    phone: string
    read_status: "0" | "1"
    mail: string
    timestamp: string
    formatted_date: string
    date: string
    hour: string
    time_ago: string
    lead_time_ago: string
    short_message: string
}

export type MESSAGE_TYPE = "ALL" | "READ" | "NEW"; 