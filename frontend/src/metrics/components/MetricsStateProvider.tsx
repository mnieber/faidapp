import * as React from 'react';
import { reaction } from 'mobx';
import { values } from 'lodash/fp';

import { MetricsState } from 'src/metrics/MetricsState';
import { CtrProvider } from 'react-default-props-context';
import { useStore } from 'src/app/components';

type PropsT = React.PropsWithChildren<{}>;

// Note: don't observe this with MobX
export const MetricsStateProvider: React.FC<PropsT> = (props: PropsT) => {
  const {
    metricsStore,
  } = useStore();

  const createState = () => {
    return new MetricsState({
      metricsStore,
    });
  };

  const updateState = (state: MetricsState) => {
    reaction(
      () => ({
        metrics: values(metricsStore.metricById),
      }),
      (inputs) => {
        state.inputs.metrics = inputs.metrics;
      },
      {
        fireImmediately: true,
      }
    );
  };

  const getDefaultProps = (state: MetricsState) => {
    return {
      metricsState: () => state,
      metrics: () => state.outputs.metricsDisplay,
      metricsSelection: () => state.metrics.selection,
      metricsHighlight: () => state.metrics.highlight,
      metric: () => state.metrics.highlight.item,

    };
  };

  return (
    <CtrProvider
      createCtr={createState}
      updateCtr={updateState}
      destroyCtr={(state: MetricsState) => state.destroy()}
      getDefaultProps={getDefaultProps}
    >
      {props.children}
    </CtrProvider>
  );
};