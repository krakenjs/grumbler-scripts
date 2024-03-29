/* eslint @typescript-eslint/no-unused-vars: "off" */
export const ENV = {
  LOCAL: "local" as "local",
  STAGE: "stage" as "stage",
  SANDBOX: "sandbox" as "sandbox",
  PRODUCTION: "production" as "production",
  TEST: "test" as "test",
  DEMO: "demo" as "demo",
};

type $Values<O extends Record<string, unknown>> = O[keyof O];

declare let __TEST__: boolean;
declare let __WEB__: boolean;
declare let __MIN__: boolean;
declare let __DEBUG__: boolean;
declare let __ENV__: $Values<typeof ENV>;
declare let __TREE_SHAKE__: boolean;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let __WINDOW__: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let __GLOBAL__: any;

declare let __LOCAL__: boolean;
declare let __STAGE__: boolean;
declare let __SANDBOX__: boolean;
declare let __PRODUCTION__: boolean;

declare let __UID__: string;
