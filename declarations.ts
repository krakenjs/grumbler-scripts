/* eslint @typescript-eslint/no-unused-vars: "off" */
import { ENV } from './config/constants';


type $Values<O extends Record<string, unknown>> = O[keyof O];

declare let __TEST__ : boolean;
declare let __WEB__ : boolean;
declare let __MIN__ : boolean;
declare let __DEBUG__ : boolean;
declare let __ENV__ : $Values<typeof ENV>;
declare let __TREE_SHAKE__ : boolean;

declare let __WINDOW__ : any;
declare let __GLOBAL__ : any;

declare let __LOCAL__ : boolean;
declare let __STAGE__ : boolean;
declare let __SANDBOX__ : boolean;
declare let __PRODUCTION__ : boolean;

declare let __UID__ : string;
