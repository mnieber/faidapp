import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { useDefaultProps, FC } from 'react-default-props-context';

import './ProjectBanner.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {};

export const ProjectBanner: FC<PropsT, DefaultPropsT> = observer(
  (p: PropsT) => {
    const props = useDefaultProps<PropsT, DefaultPropsT>(p);

    // TODO: Implement ProjectBanner
    const div = (
      <div
        className={classnames(
          'ProjectBanner flex flex-col w-full',
          props.className
        )}
      ></div>
    );

    return div;
  }
);
