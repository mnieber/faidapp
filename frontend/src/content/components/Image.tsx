import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { useDefaultProps, FC } from 'react-default-props-context';

import './Image.scss';

type PropsT = {
  className?: any;
  image: any;
  props: any;
};

type DefaultPropsT = {};

export const Image: FC<PropsT, DefaultPropsT> = observer((p: PropsT) => {
  const props = useDefaultProps<PropsT, DefaultPropsT>(p);
  const scale = (props.props?.scale ?? 100) / 100;

  const div = (
    <div
      className={classnames('Image', props.className)}
      style={{
        backgroundImage: `url(http://localhost:1337/uploads/medium_${props.image.hash}${props.image.ext})`,
        backgroundSize: '100% 100%',
        height: props.image.height * scale,
        width: props.image.width * scale,
      }}
    ></div>
  );

  return div;
});
