export type ProjectT = {
  id: string;
  name: string;
  slug: string;
};

export type ProjectByIdT = { [id: string]: ProjectT };
