import * as React from 'react';
import { reaction } from 'mobx';

import { ProjectState } from 'src/projects/ProjectState';
import { CtrProvider } from 'react-default-props-context';
import { useStore } from 'src/app/components';

type PropsT = React.PropsWithChildren<{}>;

// Note: don't observe this with MobX
export const ProjectStateProvider: React.FC<PropsT> = (props: PropsT) => {
  const {} = useStore();

  const createState = () => {
    return new ProjectState({});
  };

  const updateState = (state: ProjectState) => {
    reaction(
      () => ({}),
      (inputs) => {},
      {
        fireImmediately: true,
      }
    );
  };

  const getDefaultProps = (state: ProjectState) => {
    return {
      projectState: () => state,
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
