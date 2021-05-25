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

import Slider from 'react-slick';
import { useSyncCarouselHeader } from 'src/utils/useSyncCarouselHeader';

import './ProjectDescription.scss';

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
    const [showExpanded, setShowExpanded] = React.useState(false);
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

    const onScroll: React.UIEventHandler<HTMLDivElement> = () => {
      setShowExpanded(true);
    };

    const descriptions = concat([undefined], props.milestones).map(
      (milestone, idx) => {
        (window as any).logJS('idx', idx);
        const rawContent =
          milestone === undefined ? props.project.content : milestone.content;

        const content = JSON.parse(rawContent);
        return <Content key={idx} content={content.description} />;
      }
    );
    // TODO: Implement ProjectDescription
    const div = (
      <div
        className={classnames(
          'ProjectDescription flex flex-col w-full',
          { 'ProjectDescription--expanded': showExpanded },
          props.className
        )}
        onScroll={onScroll}
      >
        <Slider
          arrows={false}
          dots={false}
          fade={true}
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
