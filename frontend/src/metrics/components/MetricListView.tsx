import { always, flow, map } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { useDefaultProps, FC } from 'react-default-props-context';
import { ResourceView } from 'src/utils/components';
import { MetricListViewItem } from 'src/metrics/components';
import { RST } from 'src/utils/RST';
import { MetricT } from 'src/metrics/types';
import classnames from 'classnames';

import './MetricListView.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  metrics: MetricT[];
  metricsRS: RST;
};

export const MetricListView: FC<PropsT, DefaultPropsT> = observer(
  (p: PropsT) => {
    const props = useDefaultProps<PropsT, DefaultPropsT>(p);

    const metricDivs = flow(
      always(props.metrics),
      map((x) => <MetricListViewItem key={x.id} metric={x} />)
    )();

    const noItems = <h2>There are no metrics</h2>;

    const updatedDiv = (
      <div
        className={classnames(
          'MetricListView flex flex-col w-full',
          props.className
        )}
      >
        {metricDivs.length && metricDivs}
        {!metricDivs.length && noItems}
      </div>
    );

    return (
      <ResourceView
        rs={props.metricsRS}
        renderUpdated={() => updatedDiv}
        renderErrored={(message) => {
          return <div className="text-white">{message}</div>;
        }}
      />
    );
  }
);
