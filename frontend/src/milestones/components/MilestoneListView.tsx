import { always, flow, map } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { useDefaultProps, FC } from 'react-default-props-context';
import { MilestoneListViewItem } from 'src/milestones/components';
import { MilestoneT } from 'src/milestones/types';
import { Selection } from 'skandha-facets/Selection';
import { Highlight } from 'skandha-facets/Highlight';
import classnames from 'classnames';

// import './MilestoneListView.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  milestones: MilestoneT[];
  milestonesSelection: Selection;
  milestonesHighlight: Highlight;
};

export const MilestoneListView: FC<PropsT, DefaultPropsT> = observer(
  (p: PropsT) => {
    const props = useDefaultProps<PropsT, DefaultPropsT>(p);
    const milestoneDivs = flow(
      always(props.milestones),
      map((milestone) => (
        <MilestoneListViewItem
          key={milestone.id}
          milestone={milestone}
          className={classnames({
            'MilestonesListViewItem--highlighted':
              milestone && props.milestonesHighlight.id === milestone.id,
          })}
          onMouseDown={(e: any) => {
            props.milestonesSelection.selectItem({
              itemId: milestone.id,
              isShift: e.shiftKey,
              isCtrl: e.ctrlKey,
            });
          }}
        />
      ))
    )();
    const noItems = <h2>There are no milestones</h2>;
    return (
      <div
        className={classnames(
          'MilestoneListView flex flex-row w-full',
          props.className
        )}
      >
        {milestoneDivs.length && milestoneDivs}
        {!milestoneDivs.length && noItems}
      </div>
    );
  }
);
