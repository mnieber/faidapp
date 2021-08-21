import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useDefaultProps } from 'react-default-props-context';
import { TextView, TextWithSlotView } from 'src/content/components';

import './ContentView.scss';

type PropsT = {
  className?: any;
  content: any;
};

type DefaultPropsT = {};

export const ContentView: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);

  return props.content.map((x: any, idx: number) => {
    const componentName = x['__component'];
    const body =
      componentName === 'presentation.text-with-slot' ? (
        <TextWithSlotView content={x} />
      ) : componentName === 'presentation.text' ? (
        <TextView content={x} />
      ) : (
        <div>Unknown component {componentName}</div>
      );
    return (
      <div
        key={idx}
        className={classnames('ContentView', 'flex flex-col w-full', props.className)}
      >
        {body}
      </div>
    );
  });
});
