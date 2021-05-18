import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { MetricT } from 'src/metrics/types';

import "./MetricListViewItem.scss"

export type PropsT = {
  metric: MetricT;
  className?: any;
};

export const MetricListViewItem: React.FC<PropsT> = observer((props: PropsT) => {
  return (
    <div
      className={classnames(
        'MetricListViewItem flex flex-row flex-1 mb-2',
        props.className
      )}
    >
        {props.metric.name}
    </div>
  );
});