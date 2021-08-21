import classnames from 'classnames';
import yaml from 'js-yaml';
import { observer } from 'mobx-react-lite';
import { FC, useDefaultProps } from 'react-default-props-context';
import { ProjectT } from 'src/projects/types';
import './ProjectBannerView.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  project?: ProjectT;
};

export const ProjectBannerView: FC<PropsT, DefaultPropsT> = observer(
  (p: PropsT) => {
    const props = useDefaultProps<PropsT, DefaultPropsT>(p);
    if (!props.project) {
      return <div />;
    }

    const imageProps: any = yaml.load(props.project.imageProps ?? '{}');
    const posX = imageProps.posX ?? 0;
    const posY = imageProps.posY ?? 0;

    return (
      <div
        className={classnames(
          'ProjectBannerView',
          'flex flex-col w-full',
          props.className
        )}
        style={{
          backgroundImage: `url(http://localhost:1337/uploads/small_${props.project.imageHash})`,
          backgroundSize: 'cover',
          backgroundPosition: `${posX} ${posY}`,
        }}
      >
        <div className="ProjectBannerView__title">{props.project.name}</div>
      </div>
    );
  }
);
