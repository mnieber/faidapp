import { values } from 'lodash/fp';
import { action, makeObservable, observable } from 'mobx';
import { rsMap } from 'src/api/ResourceStateMap';
import { ProjectT } from 'src/projects/types';
import { isUpdatedRS, RST } from 'src/utils/RST';

export const resUrls = {
  project: `ProjectStore/project`,
};

export class ProjectStore {
  @observable project?: ProjectT;

  constructor() {
    makeObservable(this);
  }

  @action onLoadData(event: any, rs: RST, queryName: string) {
    if (queryName === 'loadProjectBySlug') {
      if (isUpdatedRS(rs)) {
        this.project = values(event.payload.projects)[0];
      }
      rsMap.registerRS(rs, [resUrls.project]);
    }
  }
}
