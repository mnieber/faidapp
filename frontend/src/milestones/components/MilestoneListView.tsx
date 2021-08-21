import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { always, concat, map, pipe, sortBy } from 'ramda';
import { FC, useDefaultProps } from 'react-default-props-context';
import { Highlight } from 'skandha-facets/Highlight';
import { Selection } from 'skandha-facets/Selection';
import { MilestoneListViewItem } from 'src/milestones/components';
import { MilestoneT } from 'src/milestones/types';
import { getResourceView } from 'src/utils/components';
import './MilestoneListView.scss';

type PropsT = {
  prefixDivs?: any[];
  className?: any;
};

type DefaultPropsT = {
  milestones: MilestoneT[];
  milestonesSelection: Selection;
  milestonesHighlight: Highlight;
  projectResUrl: string;
};

export const MilestoneListView: FC<PropsT, DefaultPropsT> = observer(
  (p: PropsT) => {
    const props = useDefaultProps<PropsT, DefaultPropsT>(p);

    const resourceView = getResourceView({ resUrl: props.projectResUrl });
    if (resourceView) return resourceView;

    const milestoneDivs = pipe(
      always(props.milestones),
      sortBy((x: MilestoneT) => !x.isCompleted),
      map((milestone) => (
        <MilestoneListViewItem
          key={milestone.id}
          milestone={milestone}
          className={classnames({
            'MilestonesListViewItem--highlighted':
              milestone && props.milestonesHighlight.id === milestone.id,
          })}
          onClick={(e: any) => {
            props.milestonesSelection.selectItem({
              itemId: milestone.id,
              isShift: e.shiftKey,
              isCtrl: e.ctrlKey,
            });
          }}
        />
      )),
      concat(props.prefixDivs ?? [])
    )();
    const noItems = <h2>There are no milestones</h2>;
    return (
      <div
        className={classnames(
          'MilestoneListView',
          'flex flex-row w-full',
          props.className
        )}
      >
        {milestoneDivs.length && milestoneDivs}
        {!milestoneDivs.length && noItems}
      </div>
    );
  }
);
