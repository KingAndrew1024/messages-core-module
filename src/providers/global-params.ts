
export class AppSettingsService {
    constructor(settings: MessagesModuleOptionsInterface) {
        this.setApiUrl(settings.apiUrl);
        this.setInstanceName(settings.instanceName);
    }

    private apiUrl: string;
    private instanceName: string;

    setApiUrl(url: string) { this.apiUrl = url; }
    getApiUrl() { return this.apiUrl; }
    setInstanceName(val: string) { this.instanceName = val };
    getInstanceName() { return this.instanceName };
}

export interface MessagesModuleOptionsInterface{
    apiUrl: string
    instanceName: string
  };