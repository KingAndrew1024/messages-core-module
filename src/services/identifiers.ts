import { InjectionToken } from '@angular/core';
import { IMessagesService } from '../core/contracts/IMessages.service';

export const MESSAGES_SERVICE = new InjectionToken<IMessagesService>('messagesService');
