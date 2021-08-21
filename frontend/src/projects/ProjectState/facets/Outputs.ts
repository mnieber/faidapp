import { computed } from 'mobx';
import { output } from 'skandha';
import { MilestoneByIdT, MilestoneT } from 'src/milestones/types';
import { ProjectT } from 'src/projects/types';
import { listToItemById } from 'src/utils/ids';

export class Outputs {
  @output projectDisplay?: ProjectT = undefined;
  @output milestonesDisplay: Array<MilestoneT> = [];

  @computed get milestoneById(): MilestoneByIdT {
    return listToItemById(this.milestonesDisplay);
  }
}
