/* eslint @typescript-eslint/no-unused-vars: "off" */
export const ENV = {
  LOCAL: "local",
  STAGE: "stage",
  SANDBOX: "sandbox",
  PRODUCTION: "production",
  TEST: "test",
  DEMO: "demo",
} as const;

export interface Global {
  __TEST__: boolean;
  __WEB__: boolean;
  __MIN__: boolean;
  __DEBUG__: boolean;
  __ENV__: typeof ENV[keyof typeof ENV];
  __TREE_SHAKE__: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  __WINDOW__: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  __GLOBAL__: any;

  __LOCAL__: boolean;
  __STAGE__: boolean;
  __SANDBOX__: boolean;
  __PRODUCTION__: boolean;

  __UID__: string;
}
