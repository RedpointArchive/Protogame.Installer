import { InstModuleRef } from './InstModuleRef';

export interface InstModule {
  id: string;
  getFriendlyName(): string;
  isInstalled(): Promise<boolean>;
  download(onProgress: (progress: number)=>void): Promise<void>;
  install(onProgress: (progress: number)=>void): Promise<void>;
  dependencies: InstModuleRef[];
  platforms: string[];
  manual: boolean;
}