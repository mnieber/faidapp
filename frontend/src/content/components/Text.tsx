import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { useDefaultProps, FC } from 'react-default-props-context';

import './Text.scss';

type PropsT = {
  className?: any;
  content: any;
};

type DefaultPropsT = {};

export const Text: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);

  // TODO: Implement Text
  const div = (
    <div className={classnames('Text flex flex-col w-full', props.className)}>
      {props.content.text}
    </div>
  );

  return div;
});
