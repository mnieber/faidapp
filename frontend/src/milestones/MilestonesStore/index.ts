import { forEach, values } from 'lodash/fp';
import { action, makeObservable, observable } from 'mobx';
import { rsMap } from 'src/api/ResourceStateMap';
import { MilestoneByIdT, MilestoneT } from 'src/milestones/types';
import { isUpdatedRS, RST } from 'src/utils/RST';

export const resourceUrls = {
  milestoneById: `MilestonesStore/milestoneById`,
};

export class MilestonesStore {
  @observable milestoneById: MilestoneByIdT = {};

  constructor() {
    makeObservable(this);
  }

  @action onLoadData(event: any, rs: RST, queryName: string) {
    if (queryName === 'loadProjectBySlug') {
      if (isUpdatedRS(rs)) {
        const milestones: MilestoneT[] = values(event.payload.milestones);
        this.addMilestones(milestones);
        rsMap.registerRS(
          rs,
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
