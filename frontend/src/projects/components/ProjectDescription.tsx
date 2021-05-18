import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { useDefaultProps, FC } from 'react-default-props-context';

import "./ProjectDescription.scss"

type PropsT = {
  className?: any
};

type DefaultPropsT = {
};

export const ProjectDescription: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);

  // TODO: Implement ProjectDescription
  const div = (
    <div className=classnames("ProjectDescription flex flex-col w-full", props.className)>
    </div>
  );

  return div;
});