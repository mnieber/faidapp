import { action, observable, makeObservable } from 'mobx';
import { isUpdatedRS, RST } from 'src/utils/RST';
import { forEach } from 'lodash/fp';
import { values } from 'lodash/fp';

import { MilestoneT, MilestoneByIdT } from 'src/milestones/types';
import { rsStore } from 'src/api/ResourceStatesStore';

export const resourceUrls = {
  milestoneById: `MilestonesStore/milestoneById`,
};

export class MilestonesStore {
  @observable milestoneById: MilestoneByIdT = {};

  constructor() {
    makeObservable(this);
  }

  @action onLoadData(event: any, state: RST, queryName: string) {
    if (queryName === 'loadProjectBySlug') {
      if (isUpdatedRS(state)) {
        const milestones: MilestoneT[] = values(event.payload.milestones);
        this.addMilestones(milestones);
        rsStore.registerState(
          state,
          milestones.map((x) => `${resourceUrls.milestoneById}/${x.id}`)
        );
      }
    }
  }

  @action addMilestones = (milestones: MilestoneT[]) => {
    forEach((milestone: MilestoneT) => {
      this.milestoneById[milestone.id] = milestone;
    }, milestones);
  };
}
