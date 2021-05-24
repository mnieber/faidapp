import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { useDefaultProps, FC } from 'react-default-props-context';
import { Text, TextWithSlot } from 'src/content/components';

import './Content.scss';

type PropsT = {
  className?: any;
  content: any;
};

type DefaultPropsT = {};

export const Content: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);

  const div = props.content.map((x: any, idx: number) => {
    const componentName = x['__component'];
    const body =
      componentName === 'presentation.text-with-slot' ? (
        <TextWithSlot content={x} />
      ) : componentName === 'presentation.text' ? (
        <Text content={x} />
      ) : (
        <div>Unknown component {componentName}</div>
      );
    return (
      <div
        key={idx}
        className={classnames('Content flex flex-col w-full', props.className)}
      >
        {body}
      </div>
    );
  });

  return div;
});
