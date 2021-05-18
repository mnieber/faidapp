import React from 'react';

import { EffectWithoutArgs } from 'src/utils/components';
import { useStore } from 'src/app/components';

type PropsT = {};

export const LoadProjectsEffect: React.FC<PropsT> = (p: PropsT) => {
  const { projectsStore } = useStore();
  return (
    <EffectWithoutArgs
      f={() => {
        projectsStore.loadProjects();
      }}
    />
  );
};