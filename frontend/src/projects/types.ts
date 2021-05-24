export type ProjectT = {
  id: string;
  name: string;
  imageHash: string;
  imageProps: string;
  slug: string;
  content: any;
  milestones: string[];
};

export type ProjectByIdT = { [id: string]: ProjectT };
