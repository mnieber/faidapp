import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useDefaultProps } from 'react-default-props-context';
import { ProjectT } from 'src/projects/types';
import yaml from 'js-yaml';

import './ProjectBanner.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  project?: ProjectT;
};

export const ProjectBanner: FC<PropsT, DefaultPropsT> = observer(
  (p: PropsT) => {
    const props = useDefaultProps<PropsT, DefaultPropsT>(p);
    if (!props.project) {
      return <div />;
    }

    const imageProps: any = yaml.load(props.project.imageProps ?? '{}');
    const posX = imageProps.posX ?? 0;
    const posY = imageProps.posY ?? 0;

    const div = (
      <div
        className={classnames(
          'ProjectBanner flex flex-col w-full',
          props.className
        )}
        style={{
          backgroundImage: `url(http://localhost:1337/uploads/small_${props.project.imageHash})`,
          backgroundSize: 'cover',
          backgroundPosition: `${posX} ${posY}`,
        }}
      >
        <div className="ProjectBanner__title">{props.project.name}</div>
      </div>
    );

    return div;
  }
);
