import { MetricT } from "src/metrics/types";
import { input } from "skandha";

export class Inputs {
  @input metrics: Array<MetricT> = [];
}