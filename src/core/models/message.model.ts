import { IMessageApiProps } from '..';

export class MessagesPageModel implements IMessagesPageProps{
    totals: { total: number; read: number; new: number; };
    messages: MessageModel[];
    chartPoints: number[];

    constructor(data: IMessagesPageProps){
        this.totals = data.totals
        this.messages = data.messages
        this.chartPoints = data.chartPoints
    }

    static empty(){
        return new MessagesPageModel({
            totals: {total: 0, read: 0, new: 0},
            messages: [],
            chartPoints: []
        })
    }
}

export interface IMessagesPageProps{
    totals:{
        total: number
        read: number
        new: number
    }
    messages: Array<MessageModel>
    chartPoints: Array<number>
}

export class MessageModel implements IMessageModelProps{
    id: number;
    name: string;
    dataName: string;
    dataMessage: string;
    message: string;
    email: string;
    phone: string;
    timestamp: string;
    formattedDate: string;
    date: string;
    hour: string;
    timeAgo: string;
    leadTimeAgo: string;
    readStatus: 0 | 1;
    shortMessage: string;

    constructor(data: IMessageModelProps){
        this.id = data.id
        this.name = data.name
        this.message = data.message
        this.email = data.email
        this.phone = data.phone
        this.timestamp = data.timestamp
        this.formattedDate = data.formattedDate
        this.date = data.date
        this.hour = data.hour
        this.timeAgo = data.timeAgo
        this.leadTimeAgo = data.leadTimeAgo
        this.readStatus = data.readStatus

        const shortMsg = (data.shortMessage || data.message.substring(0, 30));
        this.shortMessage = shortMsg.length >= 30 ? shortMsg.concat('...') : shortMsg;
    }

    static toStorage() {}

    static fromApiResponse(data: IMessageApiProps): MessageModel {
        return new MessageModel({
            id: +data.id,
            name: data.name || data.data_name,
            message: data.message || data.data_message,
            email: data.mail || data.data_email,
            phone: data.phone || data.data_phone,
            timestamp: data.timestamp,
            formattedDate: data.formatted_date,
            date: data.date || data.created_at,
            hour: data.hour,
            timeAgo: data.time_ago,
            leadTimeAgo: data.lead_time_ago,
            readStatus: data.read_status === '0' ? 0 : 1,
            shortMessage: data.short_message,
        });
    }

    static empty(): MessageModel{
        return new MessageModel({
            id: null,
            name: '',
            message: '',
            email: null,
            phone: null,
            timestamp: null,
            formattedDate: null,
            date: null,
            hour: null,
            timeAgo: null,
            leadTimeAgo: null,
            readStatus: null,
            shortMessage: null,
        });
    }
}

export interface IMessageModelProps{
    id: number
    name: string
    message: string
    email: string
    phone: string
    timestamp: string
    formattedDate: string
    date: string
    hour: string
    timeAgo: string
    leadTimeAgo: string
    readStatus: 0 | 1 
    shortMessage: string
}