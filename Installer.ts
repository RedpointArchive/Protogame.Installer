import { InstModuleRef } from './instmodule/InstModuleRef';
import { InstModule } from './instmodule/InstModule';
import * as os from 'os';

export class Installer {
  rootModuleName: string;
  modules: {[name: string]: InstModule | undefined};

  constructor(root: InstModule) {
    this.rootModuleName = root.id;
    this.modules = {};
    this.modules[root.id] = root;
    this.traverseModule(root);
  }

  private considerModule(module: InstModule) {
    if (module.platforms.length == 1 && module.platforms[0] == 'all') {
      return true;
    }
    return module.platforms.indexOf(os.type()) != -1;
  }

  private traverseModule(module: InstModule) {
    for (let ref of module.dependencies) {
      if (this.modules[ref.name] === undefined) {
        let mod = ref.factory();
        this.modules[ref.name] = mod;
        this.traverseModule(mod);
      }
    }
  }

  public async checkDependencies(): Promise<string[]> {
    return await this.checkDependenciesOf(this.modules[this.rootModuleName], []);
  }

  private async checkDependenciesOf(module: InstModule, hasChecked: string[]): Promise<string[]> {
    let result = [];

    for (let ref of module.dependencies) {
      if (hasChecked.indexOf(ref.name) == -1) {
        let dependentModule = this.modules[ref.name];
        hasChecked.push(ref.name);
        if (this.considerModule(dependentModule)) {
          let errors = await this.checkDependenciesOf(dependentModule, hasChecked);
          for (let err in errors) {
            result.push(err);
          }
        }
      }
    }

    if (module.manual) {
      if (!(await module.isInstalled())) {
        result.push(module.getFriendlyName() + " is not installed, please install it first.");
      }
    }

    return result;
  }
}