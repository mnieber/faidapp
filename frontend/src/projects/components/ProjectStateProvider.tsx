import { reaction } from 'mobx';
import * as React from 'react';
import { CtrProvider, FC, useDefaultProps } from 'react-default-props-context';
import { useStore } from 'src/app/components';
import { ProjectState } from 'src/projects/ProjectState';
import { resUrls } from 'src/projects/ProjectStore';
import { lookUp } from 'src/utils/ids';

type PropsT = React.PropsWithChildren<{}>;

type DefaultPropsT = {};

export const ProjectStateProvider: FC<PropsT, DefaultPropsT> = (p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);
  const { projectStore, milestonesStore } = useStore();

  const createState = () => {
    return new ProjectState({});
  };

  const updateState = (state: ProjectState) => {
    return reaction(
      () => ({
        project: projectStore.project,
        milestones: lookUp(
          projectStore.project?.milestones || [],
          milestonesStore.milestoneById
        ).filter((x) => x !== undefined),
      }),
      (inputs) => {
        state.inputs.project = inputs.project;
        state.inputs.milestones = inputs.milestones;
      },
      {
        fireImmediately: true,
      }
    );
  };

  const getDefaultProps = (state: ProjectState) => {
    return {
      project: () => projectStore.project,
      projectResUrl: () => resUrls.project,
      projectState: () => state,
      milestones: () => state.outputs.milestonesDisplay,
      milestonesSelection: () => state.milestones.selection,
      milestonesHighlight: () => state.milestones.highlight,
      milestone: () => state.milestones.highlight.item,
    };
  };

  return (
    <CtrProvider
      createCtr={createState}
      updateCtr={updateState}
      destroyCtr={(state: ProjectState) => state.destroy()}
      getDefaultProps={getDefaultProps}
    >
      {props.children}
    </CtrProvider>
  );
};
