import React from 'react';
import { observer } from 'mobx-react-lite';
import { concat } from 'lodash/fp';
import classnames from 'classnames';
import { useDefaultProps, FC } from 'react-default-props-context';
import { ProjectT } from 'src/projects/types';
import { MilestoneT } from 'src/milestones/types';
import { Content } from 'src/content/components';
import { Selection } from 'skandha-facets/Selection';
import { Highlight } from 'skandha-facets/Highlight';
import 'slick-carousel/slick/slick.css';

import Slider from 'react-slick';
import { useSyncCarouselHeader } from 'src/utils/useSyncCarouselHeader';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  project: ProjectT;
  milestones: MilestoneT[];
  milestonesSelection: Selection;
  milestonesHighlight: Highlight;
};

export const ProjectDescription: FC<PropsT, DefaultPropsT> = observer(
  (p: PropsT) => {
    const props = useDefaultProps<PropsT, DefaultPropsT>(p);
    const slider = React.useRef(null);

    const idx =
      props.milestonesSelection.selectableIds && props.milestonesHighlight.id
        ? 1 +
          props.milestonesSelection.selectableIds.indexOf(
            props.milestonesHighlight.id
          )
        : 0;

    useSyncCarouselHeader(slider, idx);

    const descriptions = concat([undefined], props.milestones).map(
      (milestone, idx) => {
        if (milestone === undefined) {
          return <Content key={idx} content={props.project.content} />;
        }
        return <Content key={idx} content={milestone.content} />;
      }
    );
    // TODO: Implement ProjectDescription
    const div = (
      <div
        className={classnames(
          'ProjectDescription flex flex-col w-full',
          props.className
        )}
      >
        <Slider
          arrows={false}
          dots={false}
          infinite={false}
          speed={500}
          draggable={false}
          slidesToShow={1}
          slidesToScroll={1}
          ref={slider}
        >
          {descriptions}
        </Slider>
      </div>
    );

    return div;
  }
);
