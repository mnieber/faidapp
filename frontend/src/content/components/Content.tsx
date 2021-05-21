import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { useDefaultProps, FC } from 'react-default-props-context';

import './Content.scss';

type PropsT = {
  className?: any;
  content: any;
};

type DefaultPropsT = {};

export const Content: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);

  // TODO: Implement Content
  const div = (
    <div
      className={classnames('Content flex flex-col w-full', props.className)}
    >
      {props.content}
    </div>
  );

  return div;
});
