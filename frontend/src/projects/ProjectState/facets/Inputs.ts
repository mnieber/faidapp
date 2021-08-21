import { input } from 'skandha';
import { MilestoneT } from 'src/milestones/types';
import { ProjectT } from 'src/projects/types';

export class Inputs {
  @input project?: ProjectT = undefined;
  @input milestones: Array<MilestoneT> = [];
}
