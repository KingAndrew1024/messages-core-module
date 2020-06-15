import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { messagesReducer } from './store/messages.reducer';
import { MessagesEffects } from './store/messages.effects';
import { MessagesModuleOptionsInterface, AppSettingsService } from './providers/global-params';
import { MESSAGES_SERVICE } from './services/identifiers';
import { MessagesService } from './services/messages.service';
import { MessagesRepository } from './repositories/messages.repository';
import { MessagesStore } from './services/state/messages.store';


export const AppSettingsObject = new InjectionToken('AppSettingsObject');

export function createAppSettingsService(settings: MessagesModuleOptionsInterface) {
  return new AppSettingsService(settings);
}


@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('messages', messagesReducer),
    EffectsModule.forFeature([MessagesEffects]),
  ],
  providers:[
    
  ],
  declarations: [
    // declare all components that your module uses
    //MyComponent
  ],
  exports: [
    // export the component(s) that you want others to be able to use
    //MyComponent
  ]
})
export class MessagesCoreModule {
  static forRoot(config: MessagesModuleOptionsInterface): ModuleWithProviders<MessagesCoreModule> {
    return {
      ngModule: MessagesCoreModule,
      providers: [ 
        { provide: AppSettingsObject, useValue: config },
        {
          provide: AppSettingsService,
          useFactory: (createAppSettingsService),
          deps: [AppSettingsObject]
        },
        { provide: MESSAGES_SERVICE, useClass: MessagesService },
        MessagesRepository,
        MessagesStore
      ]
    };
  }
}

