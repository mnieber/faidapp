import * as React from 'react';
import { reaction } from 'mobx';
import { values } from 'lodash/fp';

import { MilestonesState } from 'src/milestones/MilestonesState';
import { CtrProvider } from 'react-default-props-context';
import { useStore } from 'src/app/components';

type PropsT = React.PropsWithChildren<{}>;

// Note: don't observe this with MobX
export const MilestonesStateProvider: React.FC<PropsT> = (props: PropsT) => {
  const { milestonesStore } = useStore();

  const createState = () => {
    return new MilestonesState({
      milestonesStore,
    });
  };

  const updateState = (state: MilestonesState) => {
    reaction(
      () => ({
        milestones: values(milestonesStore.milestoneById),
      }),
      (inputs) => {
        state.inputs.milestones = inputs.milestones;
      },
      {
        fireImmediately: true,
      }
    );
  };

  const getDefaultProps = (state: MilestonesState) => {
    return {
      milestonesState: () => state,
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
      destroyCtr={(state: MilestonesState) => state.destroy()}
      getDefaultProps={getDefaultProps}
    >
      {props.children}
    </CtrProvider>
  );
};
