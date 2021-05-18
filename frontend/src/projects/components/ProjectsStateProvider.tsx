import * as React from 'react';
import { reaction } from 'mobx';
import { values } from 'lodash/fp';

import { ProjectsState } from 'src/projects/ProjectsState';
import { CtrProvider } from 'react-default-props-context';
import { useStore } from 'src/app/components';

type PropsT = React.PropsWithChildren<{}>;

// Note: don't observe this with MobX
export const ProjectsStateProvider: React.FC<PropsT> = (props: PropsT) => {
  const {
  } = useStore();

  const createState = () => {
    return new ProjectsState({
    });
  };

  const updateState = (state: ProjectsState) => {
    reaction(
      () => ({
      }),
      (inputs) => {
      },
      {
        fireImmediately: true,
      }
    );
  };

  const getDefaultProps = (state: ProjectsState) => {
    return {
      projectsState: () => state,

    };
  };

  return (
    <CtrProvider
      createCtr={createState}
      updateCtr={updateState}
      destroyCtr={(state: ProjectsState) => state.destroy()}
      getDefaultProps={getDefaultProps}
    >
      {props.children}
    </CtrProvider>
  );
};