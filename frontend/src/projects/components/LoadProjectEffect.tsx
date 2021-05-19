import React from 'react';
import { Effect } from 'src/utils/components';
import { useStore } from 'src/app/components/useStore';

export const LoadProjectEffect: React.FC = () => {
  const { projectStore } = useStore();

  return (
    <Effect
      f={({ projectSlug }: any) => {
        projectStore.loadProjectBySlug(projectSlug);
      }}
      getArgs={(params: any) => ({
        projectSlug: params.projectSlug,
      })}
    />
  );
};
