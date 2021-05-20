import React from 'react';
import { Effect } from 'src/utils/components';
import { useStore } from 'src/app/components/useStore';

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
