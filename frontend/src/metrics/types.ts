export type MetricT = {
  id: string;
  name: string;
};

export type MetricByIdT = { [id: string]: MetricT };
