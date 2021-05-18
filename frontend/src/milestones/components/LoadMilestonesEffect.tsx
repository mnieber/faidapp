import React from 'react';

import { EffectWithoutArgs } from 'src/utils/components';
import { useStore } from 'src/app/components';

type PropsT = {};

export const LoadMilestonesEffect: React.FC<PropsT> = (p: PropsT) => {
  const { milestonesStore } = useStore();
  return (
    <EffectWithoutArgs
      f={() => {
        milestonesStore.loadMilestones();
      }}
    />
  );
};