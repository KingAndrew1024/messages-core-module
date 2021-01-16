import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IMessageApiProps, IMessagesRepository } from '../core/contracts/IMessages.repository';
import { TEST_MESSAGES_API_LIST } from '../core/mocks/messages.data';
import { AppSettingsService } from '../providers/global-params';
import { MESSAGES_REPOSITORY } from '../services';
import { MessagesRepository } from './messages.repository';

describe('MessagesRepository', () => {
    let messagesRepository: IMessagesRepository;
    let httpTestingController: HttpTestingController;

    const okStatusText = 'success';
    const errorStatusText = 'some bad error';
    const errorStatusCode = 500;

    beforeEach(() => {
        const fakeAppSettingsService = {
            getApiUrl: () => 'any_string',
            getInstanceName: () => 'any_string'
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: AppSettingsService, useValue: fakeAppSettingsService },
                { provide: MESSAGES_REPOSITORY, useClass: MessagesRepository }
            ]
        });

        messagesRepository = TestBed.inject(MESSAGES_REPOSITORY);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('Should be created', () => {
        expect(messagesRepository).toBeTruthy('MESSAGES_REPOSITORY was not created');
    });

    it('Should call endpoint /leads and retrieve a non empty list of Messages', () => {
        messagesRepository.getMessages()
        .subscribe(response => {
            expect(response.status).toBe(okStatusText);
            expect(response.data).toBeTruthy();
            expect(response.data.messages).toBeDefined('Property messages is not defined');
            expect(response.data.messages.length).toBe(TEST_MESSAGES_API_LIST.length, 'Incorrect number of Messages returned');
        });

        const req = httpTestingController.expectOne(request => request.url.endsWith('/leads'));

        expect(req.request.method).toBe('GET');

        req.flush({ data: { messages: TEST_MESSAGES_API_LIST }, status: okStatusText });
    });

    it('Should call endpoint /leads and and throw an HttpErrorResponse', () => {
        messagesRepository.getMessages()
        .subscribe(_ => {}, error => {
            expect(error.status).toBe(errorStatusCode);
            expect(error.statusText).toBe(errorStatusText);
        });

        const req = httpTestingController.expectOne(request => request.url.endsWith('/leads'));

        expect(req.request.method).toBe('GET');

        req.flush(null, { status: errorStatusCode, statusText: errorStatusText });
    });

    it('Should call endpoint /mark_message_as_read and retrieve the Message', () => {
        const messageId = 123;

        messagesRepository.setMessageAsRead(messageId)
        .subscribe(response => {
            expect(response.status).toBe(okStatusText);
            expect(response.data).toBeDefined('Property data is not defined');
            expect(response.data).toEqual(TEST_MESSAGES_API_LIST[0] as IMessageApiProps);
        });

        const req = httpTestingController.expectOne(request => request.url.endsWith('/mark_message_as_read'));

        expect(req.request.method).toBe('POST');

        req.flush({ data: TEST_MESSAGES_API_LIST[0], status: okStatusText });
    });

    it('Should call endpoint /mark_message_as_read and and throw an HttpErrorResponse', () => {
        const messageId = 123;

        messagesRepository.setMessageAsRead(messageId)
        .subscribe(_ => {}, error => {
            expect(error.status).toBe(errorStatusCode);
            expect(error.statusText).toBe(errorStatusText);
        });

        const req = httpTestingController.expectOne(request => request.url.endsWith('/mark_message_as_read'));

        expect(req.request.method).toBe('POST');

        req.flush(null, { status: errorStatusCode, statusText: errorStatusText });
    });

    afterEach(() => {
        httpTestingController.verify();
    });
});
