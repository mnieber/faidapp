import { always, flow, map } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { useDefaultProps, FC } from 'react-default-props-context';
import { ResourceView } from 'src/utils/components';
import { MilestoneListViewItem } from 'src/milestones/components';
import { RST } from 'src/utils/RST';
import { MilestoneT } from 'src/milestones/types';
import classnames from 'classnames';

import './MilestoneListView.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  milestones: MilestoneT[];
  milestonesRS: RST;
};

export const MilestoneListView: FC<PropsT, DefaultPropsT> = observer(
  (p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);

  const milestoneDivs = flow(
    always(props.milestones),
      map((x) => <MilestoneListViewItem key={x.id} milestone={x} />)
  )();

  const noItems = <h2>There are no milestones</h2>;

  const updatedDiv = (
    <div
      className={classnames(
          'MilestoneListView flex flex-col w-full',
        props.className
      )}
    >
      {milestoneDivs.length && milestoneDivs}
      {!milestoneDivs.length && noItems}
    </div>
  );

  return (
    <ResourceView
      rs={props.milestonesRS}
      renderUpdated={() => updatedDiv}
      renderErrored={(message) => {
        return <div className="text-white">{message}</div>;
      }}
    />
  );
  }
);
