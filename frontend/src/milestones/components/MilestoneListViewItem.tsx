import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { MilestoneT } from 'src/milestones/types';

import './MilestoneListViewItem.scss';

export type PropsT = {
  milestone: MilestoneT;
  className?: any;
};

export const MilestoneListViewItem: React.FC<PropsT> = observer(
  (props: PropsT) => {
  return (
    <div
      className={classnames(
        'MilestoneListViewItem flex flex-row flex-1 mb-2',
        props.className
      )}
    >
        {props.milestone.name}
    </div>
  );
  }
);
