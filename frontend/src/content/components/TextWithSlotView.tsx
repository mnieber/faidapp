import classnames from 'classnames';
import yaml from 'js-yaml';
import { observer } from 'mobx-react-lite';
import { FC, useDefaultProps } from 'react-default-props-context';
import { ImageView } from 'src/content/components';
import './TextWithSlotView.scss';

type PropsT = {
  className?: any;
  content: any;
};

type DefaultPropsT = {};

export const TextWithSlotView: FC<PropsT, DefaultPropsT> = observer(
  (p: PropsT) => {
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
      <ImageView image={props.content.slot.image} props={extra} />
    ) : (
      'unknown slot'
    );

    const spaceY = extra.spaceY ?? 0;

    // TODO: Implement TextWithSlot
    return (
      <div className={classnames('TextWithSlotView', 'w-full')}>
        <div className="TextWithSlotView__Spacer" style={{ height: spaceY }} />
        <div className="TextWithSlotView__Slot">{slot}</div>
        {props.content.text}
      </div>
    );
  }
);
