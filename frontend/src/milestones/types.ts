export type MilestoneT = {
  id: string;
  name: string;
  content: any;
};

export type MilestoneByIdT = { [id: string]: MilestoneT };
