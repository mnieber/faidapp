import React from 'react';
import { useStore } from 'src/app/components';

type PropsT = {};

export const LoadProjectBySlugEffect: React.FC<PropsT> = (p: PropsT) => {
  const { api } = useStore();
  return (
    <Effect
      f={({ projectSlug }) => {
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
