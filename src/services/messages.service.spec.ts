import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { IMessagesRepository, IMessagesService, MessageModel, MessagesPageModel } from '../core';
import { TEST_MESSAGES_API_LIST } from '../core/mocks/messages.data';
import { MockMessagesRepository } from '../core/mocks/messages.repository.mock';
import { MESSAGES_REPOSITORY, MESSAGES_SERVICE } from './identifiers';
import { MessagesService } from './messages.service';

describe('MessagesService', () => {
    let mockMessagesRepository: IMessagesRepository;
    let messagesService: IMessagesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: MESSAGES_REPOSITORY, useClass: MockMessagesRepository },
                { provide: MESSAGES_SERVICE, useClass: MessagesService },
            ]
        });

        mockMessagesRepository = TestBed.inject(MESSAGES_REPOSITORY);
        messagesService = TestBed.inject(MESSAGES_SERVICE);
    });

    it('Should be created', () => {
        expect(messagesService).toBeTruthy('MESSAGES_SERVICE was not created');
    });

    it('Should get a MessagesPageModel with a non empty list of Messages (no sorting)', (done: DoneFn) => {
        messagesService.getMessages().subscribe(response => {
            expect(response instanceof MessagesPageModel).toBeTruthy('response is not instance of MessagesPageModel');
            expect(response.messages).toBeDefined('response.messages is not defined');
            expect(response.messages.length).toBe(TEST_MESSAGES_API_LIST.length, 'messages.length does not match');
            expect(response.messages[0] instanceof MessageModel).toBeTruthy('messages[0] is not an instance of MessageModel');
            done();
        });
    });
    it('Should get a MessagesPageModel with a non empty list of Messages (ASC)', (done: DoneFn) => {
        messagesService.getMessages('ASC').subscribe(response => {
            expect(response instanceof MessagesPageModel).toBeTruthy('response is not instance of MessagesPageModel');
            expect(response.messages).toBeDefined('response.messages is not defined');
            expect(response.messages.length).toBe(TEST_MESSAGES_API_LIST.length, 'messages.length does not match');
            expect(response.messages[0] instanceof MessageModel).toBeTruthy('messages[0] is not an instance of MessageModel');
            done();
        });
    });
    it('Should get a MessagesPageModel with a non empty list of Messages (DESC)', (done: DoneFn) => {
        messagesService.getMessages('DESC').subscribe(response => {
            expect(response instanceof MessagesPageModel).toBeTruthy('response is not instance of MessagesPageModel');
            expect(response.messages).toBeDefined('response.messages is not defined');
            expect(response.messages.length).toBe(TEST_MESSAGES_API_LIST.length, 'messages.length does not match');
            expect(response.messages[0] instanceof MessageModel).toBeTruthy('messages[0] is not an instance of MessageModel');
            done();
        });
    });
    it('Should get a MessagesPageModel with an empty list of Messages', (done: DoneFn) => {
        spyOn(mockMessagesRepository, 'getMessages').and.returnValue(of({
            data: {
                chart: [],
                messages: [],
                periods: null,
                totals: {
                    total: 0,
                    seen: 0,
                    new: 0,
                }
            },
            status: 'success'
        }));

        messagesService.getMessages().subscribe(response => {
            expect(response instanceof MessagesPageModel).toBeTruthy('response is not instance of MessagesPageModel');
            expect(response.messages).toBeDefined('response.messages is not defined');
            expect(response.messages.length).toBe(0, 'messages.length is <> 0');
            done();
        });
    });
    it('Should fail to get Messages', (done: DoneFn) => {
        spyOn(mockMessagesRepository, 'getMessages').and.returnValue(throwError('some bad error'));

        messagesService.getMessages()
            .subscribe(() => {}, error => {
                expect(error).toBeDefined();
                done();
            });
    });

    it('Should set a Messages as read', (done: DoneFn) => {
        messagesService.setMessageAsRead(123).subscribe(response => {
            expect(response instanceof MessageModel).toBeTruthy('response is not instance of MessagesPageModel');
            expect(response.readStatus).toEqual(1, 'response.readStatus is !== 1');
            done();
        });
    });
    it('Should fail to set a Messages as read', (done: DoneFn) => {
        spyOn(mockMessagesRepository, 'getMessages').and.returnValue(throwError('some bad error'));

        messagesService.getMessages()
            .subscribe(() => {}, error => {
                expect(error).toBeDefined();
                done();
            });
    });
});
