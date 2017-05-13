import { InstModule } from './InstModule';
import commandExists = require('command-exists');

export class MonoInstModule implements InstModule {
  id = 'MonoInstalled';
  dependencies = [];
  platforms = ['Darwin','Linux'];
  manual = true;

  getFriendlyName() {
    return "Mono";
  }

  isInstalled(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      commandExists('mono', (err, commandExists) => {
        if (err) {
          reject(err);
        }

        resolve(commandExists);
      });
    });
  }

  async download(onProgress: (progress: number)=>void): Promise<void> {

  }

  async install(onProgress: (progress: number)=>void): Promise<void> {

  }
}