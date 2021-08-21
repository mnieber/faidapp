import { action, makeObservable, observable } from 'mobx';
import { values } from 'ramda';
import { rsMap } from 'src/api/ResourceStateMap';
import { ProjectT } from 'src/projects/types';
import { isUpdatedRS, RST } from 'src/utils/RST';
import { ObjT } from 'src/utils/types';

export const resUrls = {
  project: `ProjectStore/project`,
};

export class ProjectStore {
  @observable project?: ProjectT;

  constructor() {
    makeObservable(this);
  }

  @action onLoadData(event: any, rs: RST, queryName: string, data: ObjT) {
    if (queryName === 'getProjectBySlug') {
      if (isUpdatedRS(rs)) {
        this.project = values(data.projects)[0];
      }
      rsMap.registerRS(rs, [resUrls.project]);
    }
  }
}
