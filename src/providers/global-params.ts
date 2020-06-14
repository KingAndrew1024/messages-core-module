import { MessagesModuleOptionsInterface } from "../messages.module";



export class Params{
    private static apiUrl: string;
    private static instanceName: string;

    static setApiUrl(url: string){this.apiUrl = url;}
    static getApiUrl(){return this.apiUrl;}
    static setInstanceName(val: string){  this.instanceName = val};
    static getInstanceName(){  return this.instanceName};

    static setFromObject(conf: MessagesModuleOptionsInterface){
        this.apiUrl = conf.apiUrl;
        this.instanceName = conf.instanceName;
    }
}