import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { useDefaultProps, FC } from 'react-default-props-context';
import { ProjectT } from 'src/projects/types';

import './ProjectBanner.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  project: ProjectT;
};

export const ProjectBanner: FC<PropsT, DefaultPropsT> = observer(
  (p: PropsT) => {
    const props = useDefaultProps<PropsT, DefaultPropsT>(p);

    const div = (
      <div
        className={classnames(
          'ProjectBanner flex flex-col w-full',
          props.className
        )}
      >
        {props.project.name}
      </div>
    );

    return div;
  }
);
