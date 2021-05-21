export type ProjectT = {
  id: string;
  name: string;
  slug: string;
  content: any;
  milestones: string[];
};

export type ProjectByIdT = { [id: string]: ProjectT };
