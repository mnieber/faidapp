import { action, observable, makeObservable } from 'mobx';
import { ProjectT } from 'src/projects/types';
import { isUpdatedRS, resetRS, RST } from 'src/utils/RST';
import { values } from 'lodash/fp';

export class ProjectStore {
  @observable project?: ProjectT;
  @observable projectRS: RST = resetRS();

  constructor() {
    makeObservable(this);
  }

  @action onLoadData(event: any) {
    if (event.topic === 'LOAD_PROJECT') {
      this.projectRS = event.payload.rs;
      this.project = isUpdatedRS(this.projectRS)
        ? values(event.payload.projects)[0]
        : undefined;
    }
  }
}
