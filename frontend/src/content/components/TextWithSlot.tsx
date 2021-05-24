import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { useDefaultProps, FC } from 'react-default-props-context';
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
  const slot = props.content.slot.changemaker ? (
    <div>'changemaker'</div>
  ) : props.content.slot.milestone ? (
    <div>'milestone'</div>
  ) : props.content.slot.project ? (
    <div>'project'</div>
  ) : props.content.slot.organization ? (
    <div>'organization'</div>
  ) : props.content.slot.image ? (
    <Image
      image={props.content.slot.image}
      props={yaml.load(props.content.slot.props ?? '{}')}
    />
  ) : (
    'unknown slot'
  );

  // TODO: Implement TextWithSlot
  const div = (
    <div className={classnames('TextWithSlot w-full')}>
      <div className="TextWithSlot__Slot">{slot}</div>
      {props.content.text}
    </div>
  );

  return div;
});
