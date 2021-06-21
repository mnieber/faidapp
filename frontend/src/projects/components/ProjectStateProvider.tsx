import * as React from 'react';
import { cleanUpCtr, CtrProvider } from 'react-default-props-context';
import { useStore } from 'src/app/components';

type PropsT = React.PropsWithChildren<{}>;

export const ProjectStateProvider: React.FC<PropsT> = (props: PropsT) => {
  const { projectStore } = useStore();

  const createState = () => {
    return {};
  };

  const updateState = (state: any) => {};

  const getDefaultProps = (state: any) => {
    return {
      project: () => projectStore.project,
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
