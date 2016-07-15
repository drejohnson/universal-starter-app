declare const ROOT_DIR: string;
declare const SRC_DIR: string;
declare const DIST_DIR: string;
declare const CLIENT_DIR: string;
declare const SERVER_DIR: string;

declare const HOST: string;
declare const PORT: number;

declare const VENDOR_NAME: string;
declare const SERVER_NAME: string;
declare const CLIENT_NAME: string;

declare const SERVER_SOURCE_PATH: string;
declare const VENDOR_SOURCE_PATH: string;
declare const CLIENT_SOURCE_PATH: string;

declare const SITE_URL: string;

// support NodeJS modules without type definitions
declare module "*";

declare interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}

interface WebpackModule {
  hot: {
    data?: any,
    idle: any,
    accept(dependencies?: string | string[], callback?: (updatedDependencies?: any) => void): void;
    decline(dependencies?: string | string[]): void;
    dispose(callback?: (data?: any) => void): void;
    addDisposeHandler(callback?: (data?: any) => void): void;
    removeDisposeHandler(callback?: (data?: any) => void): void;
    check(autoApply?: any, callback?: (err?: Error, outdatedModules?: any[]) => void): void;
    apply(options?: any, callback?: (err?: Error, outdatedModules?: any[]) => void): void;
    status(callback?: (status?: string) => void): void | string;
    removeStatusHandler(callback?: (status?: string) => void): void;
  };
}

interface WebpackRequire {
  (id: string): any;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure(ids: string[], callback: (req: WebpackRequire) => void, chunkName?: string): void;
  context(directory: string, useSubDirectories?: boolean, regExp?: RegExp): WebpackContext;
}

interface WebpackContext extends WebpackRequire {
  keys(): string[];
}

interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}

// Extend typings
interface NodeRequire extends WebpackRequire {}
interface ErrorConstructor extends ErrorStackTraceLimit {}
interface NodeModule extends WebpackModule {}

