import { always, flow, map } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { useDefaultProps, FC } from 'react-default-props-context';
import { MilestoneListViewItem } from 'src/milestones/components';
import { MilestoneT } from 'src/milestones/types';
import classnames from 'classnames';

// import './MilestoneListView.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  milestones: MilestoneT[];
};

export const MilestoneListView: FC<PropsT, DefaultPropsT> = observer(
  (p: PropsT) => {
    const props = useDefaultProps<PropsT, DefaultPropsT>(p);
    const milestoneDivs = flow(
      always(props.milestones),
      map((x) => <MilestoneListViewItem key={x.id} milestone={x} />)
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
