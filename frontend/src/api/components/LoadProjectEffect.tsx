import React from 'react';
import { useStore } from 'src/app/components/useStore';
import { Effect } from 'src/utils/components';

export const LoadProjectEffect: React.FC = () => {
  const { api } = useStore();

  return (
    <Effect
      f={({ projectSlug }: any) => {
        api.loadProjectBySlug(projectSlug);
      }}
      getArgs={(params: any) => ({
        projectSlug: params.projectSlug,
      })}
    />
  );
};
