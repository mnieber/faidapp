import * as React from 'react';
import { cleanUpCtr } from 'skandha';

import { CtrProvider } from 'react-default-props-context';
import { useStore } from 'src/app/components';

type PropsT = React.PropsWithChildren<{}>;

// Note: don't observe this with MobX
export const ProjectStateProvider: React.FC<PropsT> = (props: PropsT) => {
  const { projectStore } = useStore();

  const createState = () => {
    return {};
  };

  const updateState = (state: any) => {};

  const getDefaultProps = (state: any) => {
    return {
      project: () => projectStore.project,
      projectRS: () => projectStore.projectRS,
    };
  };

  return (
    <CtrProvider
      createCtr={createState}
      updateCtr={updateState}
      destroyCtr={(state: any) => cleanUpCtr(state)}
      getDefaultProps={getDefaultProps}
    >
      {props.children}
    </CtrProvider>
  );
};
