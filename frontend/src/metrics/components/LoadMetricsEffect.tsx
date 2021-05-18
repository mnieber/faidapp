import React from 'react';

import { EffectWithoutArgs } from 'src/utils/components';
import { useStore } from 'src/app/components';

type PropsT = {};

export const LoadMetricsEffect: React.FC<PropsT> = (p: PropsT) => {
  const { metricsStore } = useStore();
  return (
    <EffectWithoutArgs
      f={() => {
        metricsStore.loadMetrics();
      }}
    />
  );
};