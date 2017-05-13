import { InstModule } from './InstModule';

export class InstModuleRef {
  name: string;
  factory: ()=>InstModule;

  constructor(ref: ()=>InstModule) {
    this.name = ref().id;
    this.factory = ref;
  }
}