import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useDefaultProps } from 'react-default-props-context';
import './TextView.scss';

type PropsT = {
  className?: any;
  content: any;
};

type DefaultPropsT = {};

export const TextView: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);
  return (
    <div
      className={classnames(
        'TextView',
        'flex flex-col w-full',
        props.className
      )}
    >
      {props.content.text}
    </div>
  );
});
