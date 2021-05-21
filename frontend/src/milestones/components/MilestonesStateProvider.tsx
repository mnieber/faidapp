import * as React from 'react';
import { reaction } from 'mobx';
import { useDefaultProps, FC } from 'react-default-props-context';
import { observer } from 'mobx-react-lite';

import { MilestonesState } from 'src/milestones/MilestonesState';
import { CtrProvider } from 'react-default-props-context';
import { useStore } from 'src/app/components';
import { ProjectT } from 'src/projects/types';
import { lookUp } from 'src/utils/ids';

type PropsT = React.PropsWithChildren<{}>;

type DefaultPropsT = {
  project?: ProjectT;
};

export const MilestonesStateProvider: FC<PropsT, DefaultPropsT> = observer(
  (p: PropsT) => {
    const props = useDefaultProps<PropsT, DefaultPropsT>(p);
    const { milestonesStore } = useStore();

    const createState = () => {
      return new MilestonesState({
        milestonesStore,
      });
    };

    const updateState = (state: MilestonesState) => {
      reaction(
        () => {
          return {
            milestones: lookUp(
              props.project?.milestones || [],
              milestonesStore.milestoneById
            ).filter((x) => x !== undefined),
          };
        },
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
  }
);
