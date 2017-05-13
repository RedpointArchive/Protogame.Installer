import { InstModuleRef } from './InstModuleRef';
import { MonoInstModule } from './MonoInstModule';
import { InstModule } from './InstModule';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

export class ProtobuildInstModule implements InstModule {
  id = 'ProtobuildInstalled';
  dependencies = [
    new InstModuleRef(() => new MonoInstModule()),
  ];
  platforms = ['all'];
  manual = false;

  getFriendlyName() {
    return "Protobuild";
  }

  async isInstalled(): Promise<boolean> {
    let protobuildPath = null;
    if (os.type() == 'Linux' || os.type() == 'Darwin') {
      protobuildPath = path.join(os.homedir(), '.config/Protobuild.exe');
    } else {
      let programFiles = process.env["ProgramFiles(x86)"] || process.env["ProgramFiles"];
      protobuildPath = path.join(programFiles, 'Protobuild', 'Protobuild.exe');
    }
    return await new Promise<boolean>((resolve, reject) => {
      fs.access(protobuildPath, (err) => {
        resolve(!err);
      });
    });
  }

  async download(onProgress: (progress: number)=>void): Promise<void> {

  }

  async install(onProgress: (progress: number)=>void): Promise<void> {

  }
}