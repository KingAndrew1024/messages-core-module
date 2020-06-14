import { NgModule, ModuleWithProviders } from '@angular/core';
import { Params } from './providers/global-params';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { reducer, MessagesEffects, MESSAGES_SERVICE, MessagesRepository, MessagesStore, MessagesService } from '.';


@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('messages', reducer),
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
  static forRoot(options): ModuleWithProviders<MessagesCoreModule> {
    Params.setApiUrl(options.apiUrl)
    Params.setInstanceName(options.instanceName)

    return {
      ngModule: MessagesCoreModule,
      providers: [ 
        { provide: MESSAGES_SERVICE, useClass: MessagesService },
        MessagesRepository,
        MessagesStore
      ]
    };
  }
}

export interface MessagesModuleOptionsInterface{
  apiUrl: string
  instanceName: string
};

