import { InjectionToken } from '@angular/core';
import { IMessagesRepository } from '../core';
import { IMessagesService } from '../core/contracts/IMessages.service';

export const MESSAGES_SERVICE = new InjectionToken<IMessagesService>('messagesService');
export const MESSAGES_REPOSITORY = new InjectionToken<IMessagesRepository>('messagesRepository');
