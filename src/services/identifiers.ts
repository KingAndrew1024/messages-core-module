import { InjectionToken } from '@angular/core';
import { IMessagesService } from '..';


export const MESSAGES_SERVICE = new InjectionToken<IMessagesService>('messagesService');

