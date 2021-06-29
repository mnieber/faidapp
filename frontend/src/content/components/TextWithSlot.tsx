import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useDefaultProps } from 'react-default-props-context';
import { Image } from 'src/content/components';
import yaml from 'js-yaml';

import './TextWithSlot.scss';

type PropsT = {
  className?: any;
  content: any;
};

type DefaultPropsT = {};

export const TextWithSlot: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);
  const extra: any = yaml.load(props.content.slot.props ?? '{}');

  const slot = props.content.slot.changemaker ? (
    <div>'changemaker'</div>
  ) : props.content.slot.milestone ? (
    <div>'milestone'</div>
  ) : props.content.slot.project ? (
    <div>'project'</div>
  ) : props.content.slot.organization ? (
    <div>'organization'</div>
  ) : props.content.slot.image ? (
    <Image image={props.content.slot.image} props={extra} />
  ) : (
    'unknown slot'
  );

  const spaceY = extra.spaceY ?? 0;

  // TODO: Implement TextWithSlot
  const div = (
    <div className={classnames('TextWithSlot w-full')}>
      <div className="TextWithSlot__Spacer" style={{ height: spaceY }} />
      <div className="TextWithSlot__Slot">{slot}</div>
      {props.content.text}
    </div>
  );

  return div;
});
