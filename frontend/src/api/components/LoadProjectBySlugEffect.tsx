import React from 'react';
import { useStore } from 'src/app/components';
import { Effect } from 'src/utils/components';

type ArgsT = {
  projectSlug: string;
};

type PropsT = {};

export const LoadProjectBySlugEffect: React.FC<PropsT> = (p: PropsT) => {
  const { api } = useStore();
  return (
    <Effect
      f={({ projectSlug }: ArgsT) => {
        api.getProjectBySlug(projectSlug);
      }}
      getArgs={(params) => {
        return {
          projectSlug: params.projectSlug,
        };
      }}
    />
  );
};
