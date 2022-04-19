/* @flow */

// $FlowFixMe[toplevel-library-import]
import { ENV } from "./config/constants";

declare var __TEST__: boolean;
declare var __WEB__: boolean;
declare var __MIN__: boolean;
declare var __DEBUG__: boolean;
declare var __ENV__: $Values<typeof ENV>;
declare var __TREE_SHAKE__: boolean;

declare var __WINDOW__: any; // eslint-disable-line flowtype/no-weak-types
declare var __GLOBAL__: any; // eslint-disable-line flowtype/no-weak-types

declare var __LOCAL__: boolean;
declare var __STAGE__: boolean;
declare var __SANDBOX__: boolean;
declare var __PRODUCTION__: boolean;

declare var __UID__: string;
