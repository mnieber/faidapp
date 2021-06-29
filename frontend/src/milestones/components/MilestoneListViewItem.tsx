import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { MilestoneT } from 'src/milestones/types';
import { CheckCircleOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

import './MilestoneListViewItem.scss';

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
          'MilestoneListViewItem flex flex-row',
          props.className
        )}
        onMouseDown={props.onMouseDown}
      >
        {props.milestone.isCompleted ? (
          <CheckCircleOutlined className="MilestonesListViewItem__Icon text-2xl" />
        ) : (
          <FontAwesomeIcon
            className="MilestonesListViewItem__Icon text-2xl"
            icon={faCircle}
          />
        )}
      </div>
    );
  }
);
