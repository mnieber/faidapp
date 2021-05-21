export type ProjectT = {
  id: string;
  name: string;
  slug: string;
  milestones: string[];
};

export type ProjectByIdT = { [id: string]: ProjectT };
