/* @flow */

import { ENV } from './config/constants';

declare var __TEST__ : boolean;
declare var __WEB__ : boolean;
declare var __MIN__ : boolean;
declare var __DEBUG__ : boolean;
declare var __ENV__ : $Values<typeof ENV>;
declare var __TREE_SHAKE__ : boolean;
