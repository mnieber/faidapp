import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useDefaultProps } from 'react-default-props-context';
import './ImageView.scss';

type PropsT = {
  className?: any;
  image: any;
  props: any;
};

type DefaultPropsT = {};

export const ImageView: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);
  const scale = (props.props?.scale ?? 100) / 100;

  return (
    <div
      className={classnames('ImageView', props.className)}
      style={{
        backgroundImage: `url(http://localhost:1337/uploads/medium_${props.image.hash}${props.image.ext})`,
        backgroundSize: '100% 100%',
        height: props.image.height * scale,
        width: props.image.width * scale,
      }}
    ></div>
  );
});
