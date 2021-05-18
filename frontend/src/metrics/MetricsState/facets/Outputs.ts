import { computed } from 'mobx';
import { MetricT, MetricByIdT } from 'src/metrics/types';
import { listToItemById } from 'src/utils/ids';
import { output } from 'skandha';

export class Outputs {
  @output metricsDisplay: Array<MetricT> = [];

  @computed get metricById(): MetricByIdT {
    return listToItemById(this.metricsDisplay);
  }

}