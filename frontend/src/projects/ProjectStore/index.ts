import { action, observable, makeObservable } from 'mobx';
import { ProjectT } from 'src/projects/types';
import { values } from 'lodash/fp';
import { rsStore } from 'src/api/ResourceStatesStore';
import { isUpdatedRS, RST } from 'src/utils/RST';

export const resourceUrls = {
  project: `ProjectStore/project`,
};

export class ProjectStore {
  @observable project?: ProjectT;

  constructor() {
    makeObservable(this);
  }

  @action onLoadData(event: any, state: RST, queryName: string) {
    if (queryName === 'loadProjectBySlug') {
      if (isUpdatedRS(state)) {
        this.project = values(event.payload.projects)[0];
      }
      rsStore.registerState(state, [resourceUrls.project]);
    }
  }
}
