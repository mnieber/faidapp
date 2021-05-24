export type MilestoneT = {
  id: string;
  name: string;
  isCompleted: boolean;
  content: any;
};

export type MilestoneByIdT = { [id: string]: MilestoneT };
