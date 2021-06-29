import { forEach } from 'lodash/fp';
import { action, makeObservable, observable } from 'mobx';
import { resetRS, RST } from 'src/utils/RST';

export class ResourceStateMap {
  @observable rsByResUrl: { [key: string]: RST } = {};

  constructor() {
    makeObservable(this);
  }

  @action registerRS(rs: RST, resUrls: string[]) {
    forEach((resUrl: string) => (this.rsByResUrl[resUrl] = rs))(resUrls);
  }

  getRS(resUrl: string): RST {
    return this.rsByResUrl[resUrl] ?? resetRS();
  }
}

export const rsMap = new ResourceStateMap();
