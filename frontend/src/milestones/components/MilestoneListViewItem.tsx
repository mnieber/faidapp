import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { MilestoneT } from 'src/milestones/types';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Icon } from '@ant-design/compatible';

import './MilestoneListViewItem.scss';

const CircleSvg = () => (
  <svg width="30" height="30" viewBox="0 0 30 30">
    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z" />
  </svg>
);

export type PropsT = {
  milestone: MilestoneT;
  className?: any;
  onMouseDown: any;
};

export const MilestoneListViewItem: React.FC<PropsT> = observer(
  (props: PropsT) => {
    return (
      <div
        className={classnames(
          'MilestoneListViewItem flex flex-row mb-2',
          props.className
        )}
        onMouseDown={props.onMouseDown}
      >
        {props.milestone.isCompleted ? (
          <CheckCircleOutlined className="MilestonesListViewItem__Icon text-2xl" />
        ) : (
          <Icon
            component={CircleSvg}
            className="MilestonesListViewItem__Icon text-3xl"
          />
        )}
      </div>
    );
  }
);
