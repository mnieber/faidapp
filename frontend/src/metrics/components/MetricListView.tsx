import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { always, map, pipe } from 'ramda';
import { FC, useDefaultProps } from 'react-default-props-context';
import { MetricListViewItem } from 'src/metrics/components';
import { MetricT } from 'src/metrics/types';
import { getResourceView } from 'src/utils/components';
import './MetricListView.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  metrics: MetricT[];
  metricsResUrl: string;
};

export const MetricListView: FC<PropsT, DefaultPropsT> = observer(
  (p: PropsT) => {
    const props = useDefaultProps<PropsT, DefaultPropsT>(p);

    const resourceView = getResourceView({ resUrl: props.metricsResUrl });
    if (resourceView) return resourceView;

    const metricDivs = pipe(
      always(props.metrics),
      map((x: MetricT) => <MetricListViewItem key={x.id} metric={x} />)
    )();

    const noItems = <h2>There are no metrics</h2>;

    return (
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
  }
);
